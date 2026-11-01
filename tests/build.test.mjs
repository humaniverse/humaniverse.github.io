import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSite } from '../scripts/build.mjs';
import { readJSON, validateContent, root } from '../scripts/content.mjs';

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
    for(const recommendation of pathway.projectRecommendations) {
      const project = result.projects.find(p=>p.id===recommendation.projectId);
      assert.ok(guide.includes(`/catalogue/${project.slug}/`));
      assert.ok(html(`/catalogue/${project.slug}/`).includes(`/tasks/${pathway.slug}/`));
    }
  }
  const home = html('/');
  const composition = home.match(/<div class="hero-art"[\s\S]*?<\/section>/)[0];
  assert.match(composition,/aria-hidden="true"/);
  assert.doesNotMatch(composition,/<a |<button|tabindex|People|Places|Risks|Methods/);
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
