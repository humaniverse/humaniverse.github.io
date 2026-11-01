import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSite } from '../scripts/build.mjs';
import { readJSON, validateContent, pathwayResources, root } from '../scripts/content.mjs';

const result = buildSite();
const dist = resolve(root,'dist');
const html = route => readFileSync(resolve(dist,'.'+route+'index.html'),'utf8');
test('every generated page loads by directory index and local links and assets resolve',()=>{
  assert.equal(result.projects.length,readJSON('content/inventory.json').repositories.filter(item=>item.disposition==='included').length);
  for(const route of result.routes) {
    const body = html(route);
    assert.equal((body.match(/<h1(?:\s|>)/g)||[]).length,1,route+' has one h1');
    assert.match(body,/<title>[^<]+<\/title>/);
    for(const match of body.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[^\"]*)"/g)) {
      const path = match[1];
      assert.ok(existsSync(resolve(dist,'.'+path+(path.endsWith('/')?'index.html':''))),`${route} links to missing ${path}`);
    }
  }
  assert.ok(existsSync(resolve(dist,'404.html')));
});
test('all projects and recommendations render without requiring JavaScript',()=>{
  const catalogue = html('/catalogue/');
  assert.equal((catalogue.match(/data-project-id=/g)||[]).length,result.projects.length);
  assert.match(catalogue,/data-enhanced hidden/);
  for(const pathway of result.pathways) {
    const guide = html(`/tasks/${pathway.slug}/`);
    for(const recommendation of pathwayResources(pathway)) {
      const project = result.projects.find(p=>p.id===recommendation.projectId);
      assert.ok(guide.includes(`/catalogue/${project.slug}/`));
      assert.ok(html(`/catalogue/${project.slug}/`).includes(`/tasks/${pathway.slug}/`));
    }
    for(const related of pathway.relatedPathways || []) {
      const task = result.pathways.find(p=>p.id===related.pathwayId);
      assert.ok(guide.includes(`/tasks/${task.slug}/`));
    }
    for(const [key, heading] of [['supportingResources','Supporting resources'],['researchResources','Related data and research']]) {
      if(pathway[key]?.length) assert.ok(guide.includes(heading));
    }
  }
  const home = html('/');
  const composition = home.match(/<div class="hero-art"[\s\S]*?<\/section>/)[0];
  assert.match(composition,/aria-hidden="true"/);
  assert.doesNotMatch(composition,/<a |<button|tabindex|People|Places|Risks|Methods/);
});
test('task discovery offers a selected homepage preview and a complete index, with a task home for every product',()=>{
  assert.equal(result.pathways.length,8);
  const index = html('/tasks/'),home = html('/');
  const taskBand = home.match(/<section class="task-band"[\s\S]*?<\/section>/)[0];
  const reachable = new Set(result.pathways.flatMap(pathwayResources).map(r=>r.projectId));
  for(const project of result.projects) assert.ok(reachable.has(project.id),`${project.id} has a task home`);
  for(const task of result.pathways) {
    const destination = `/tasks/${task.slug}/`;
    assert.ok(index.includes(destination));
    assert.equal(taskBand.includes(destination),Boolean(task.featured));
  }
  assert.equal((taskBand.match(/<a class="task-choice(?: |")/g)||[]).length,3);
  assert.match(taskBand,/See all 8 tasks/);
});
test('the publication validator rejects missing or unsupported content and broken relationships',()=>{
  const originalProjects=readJSON('content/projects.json'),originalPathways=readJSON('content/pathways.json');
  for(const mutate of [
    projects=>{projects[0].subjects=['vulnerability'];},
    projects=>{projects[0].maturity='popular';},
    projects=>{projects[0].links.app='javascript:alert(1)';},
    projects=>{projects[0].id=projects[1].id;},
    projects=>{projects[0].evidence=[];},
    projects=>{projects[0].image={path:'/missing.png',alt:''};}
  ]) {
    const projects=structuredClone(originalProjects);mutate(projects);
    assert.throws(()=>validateContent(projects,originalPathways));
  }
  const pathways=structuredClone(originalPathways);pathways[0].projectRecommendations[0].projectId='missing';
  assert.throws(()=>validateContent(originalProjects,pathways),/missing or unpublished/);
  const projects=structuredClone(originalProjects);projects.find(p=>p.id==='demographr').published=false;
  assert.throws(()=>validateContent(projects,originalPathways),/unpublished/);
});
test('publication validation checks supporting and research resources, single-resource guides and related tasks',()=>{
  const projects=readJSON('content/projects.json'),original=readJSON('content/pathways.json');
  assert.ok(original.some(p=>p.projectRecommendations.length===1));
  assert.doesNotThrow(()=>validateContent(projects,original));
  const cases = [
    [p=>{p[0].projectRecommendations=[];},/must recommend 1–4/],
    [p=>{p[0].projectRecommendations=Array(5).fill(p[0].projectRecommendations[0]);},/must recommend 1–4/],
    [p=>{p[0].supportingResources[0].projectId='missing';},/missing or unpublished project/],
    [p=>{p[0].researchResources[0].projectId='missing';},/missing or unpublished project/],
    [p=>{p[0].researchResources=[p[0].projectRecommendations[0]];},/duplicate projectId/],
    [p=>{p[0].supportingResources={};},/invalid supportingResources/],
    [p=>{p[0].researchResources[0].explanation='';},/missing explanation/],
    [p=>{p[0].relatedPathways[0].pathwayId='missing';},/missing or unpublished related pathway/],
    [p=>{p[0].relatedPathways[0].pathwayId=p[0].id;},/cannot relate a pathway to itself/],
    [p=>{p[0].relatedPathways.push(p[0].relatedPathways[0]);},/duplicate pathwayId/],
    [p=>{p.find(x=>x.id===p[0].relatedPathways[0].pathwayId).published=false;},/unpublished related pathway/],
    [p=>{p[0].relatedPathways[0].explanation='';},/missing explanation/],
    [p=>{p[0].featured='yes';},/featured must be boolean/]
  ];
  for(const [mutate,pattern] of cases) {
    const pathways=structuredClone(original);mutate(pathways);
    assert.throws(()=>validateContent(projects,pathways),pattern);
  }
  for(const key of ['supportingResources','researchResources']) {
    const unpublished=structuredClone(projects);
    unpublished.find(p=>p.id===original[0][key][0].projectId).published=false;
    assert.throws(()=>validateContent(unpublished,original),/unpublished project/);
  }
});
