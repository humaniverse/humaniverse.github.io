import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { subjects, types } from '../src/discovery.mjs';

export const root = resolve(import.meta.dirname, '..');
export const readJSON = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
export const resourceGroups = ['projectRecommendations', 'supportingResources', 'researchResources'];
export const pathwayResources = pathway => resourceGroups.flatMap(key => pathway[key] || []);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validateContent(projects, pathways, inventory) {
  const errors = [];
  const requireText = (obj, key, label) => { if (typeof obj[key] !== 'string' || !obj[key].trim()) errors.push(`${label}: missing ${key}`); };
  const validURL = (value, label) => { try { const u = new URL(value); if (u.protocol !== 'https:') throw Error(); } catch { errors.push(`${label}: invalid HTTPS URL ${value}`); } };
  const unique = (items, key, label) => { const seen = new Set(); for (const item of items) { if (seen.has(item[key])) errors.push(`${label}: duplicate ${key} ${item[key]}`); seen.add(item[key]); } };
  const reviewed = (item, label) => {
    if (!datePattern.test(item.reviewedAt || '') || Number.isNaN(Date.parse(item.reviewedAt))) errors.push(`${label}: invalid review date`);
    if (!Array.isArray(item.evidence) || !item.evidence.length) errors.push(`${label}: missing evidence`);
    else item.evidence.forEach(url => validURL(url, label));
  };
  unique(projects, 'id', 'Projects'); unique(projects, 'slug', 'Projects');
  unique(pathways, 'id', 'Pathways'); unique(pathways, 'slug', 'Pathways');
  for (const p of projects) {
    const label = p.id || 'Project';
    for (const key of ['id', 'slug', 'name', 'summary', 'description', 'coverage', 'maturity']) requireText(p, key, label);
    if (!slugPattern.test(p.slug || '')) errors.push(`${label}: invalid slug`);
    if (typeof p.published !== 'boolean') errors.push(`${label}: published must be boolean`);
    for (const [key, vocabulary] of [['subjects', subjects], ['types', types]]) {
      if (!Array.isArray(p[key]) || !p[key].length || p[key].some(v => !Object.hasOwn(vocabulary, v))) errors.push(`${label}: unsupported or empty ${key}`);
    }
    if (!['prototype','development','stable','archived','unknown'].includes(p.maturity)) errors.push(`${label}: unsupported maturity`);
    if (!['app','docs','repository'].some(key => p.links?.[key])) errors.push(`${label}: no access destination`);
    for (const [key, url] of Object.entries(p.links || {})) { if (!['app','docs','repository','source','license'].includes(key)) errors.push(`${label}: unsupported link ${key}`); validURL(url, label); }
    for (const key of ['platforms','prerequisites','keywords']) if (p[key] !== undefined && key !== 'prerequisites' && (!Array.isArray(p[key]) || p[key].some(v => typeof v !== 'string'))) errors.push(`${label}: invalid ${key}`);
    for (const key of ['prerequisites','dataPeriod']) if (p[key] !== undefined && typeof p[key] !== 'string') errors.push(`${label}: invalid ${key}`);
    if (p.featured !== undefined && typeof p.featured !== 'boolean') errors.push(`${label}: featured must be boolean`);
    if (p.dataUpdatedAt && !datePattern.test(p.dataUpdatedAt)) errors.push(`${label}: invalid data update date`);
    for (const [destination, availability] of Object.entries(p.availability || {})) {
      if (!p.links?.[destination] || !['available','unavailable','unknown'].includes(availability.status) || !datePattern.test(availability.checkedAt || '')) errors.push(`${label}: invalid availability`);
    }
    if (p.image && (!p.image.alt?.trim() || !p.image.path?.startsWith('/assets/') || p.image.path.includes('..') || !existsSync(resolve(root, 'public' + p.image.path)))) errors.push(`${label}: invalid image path or alt text`);
    if (p.published) reviewed(p, label);
  }
  for (const p of pathways) {
    const label = p.id || 'Pathway';
    for (const key of ['id','slug','title','summary','scope','guidance','relatedCatalogueQuery']) requireText(p, key, label);
    if (!slugPattern.test(p.slug || '') || typeof p.published !== 'boolean') errors.push(`${label}: invalid publication or slug`);
    if (p.featured !== undefined && typeof p.featured !== 'boolean') errors.push(`${label}: featured must be boolean`);
    if (!Array.isArray(p.projectRecommendations) || p.projectRecommendations.length < 1 || p.projectRecommendations.length > 4) errors.push(`${label}: must recommend 1–4 projects`);
    const resources = [];
    for (const group of resourceGroups) {
      if (p[group] === undefined && group !== 'projectRecommendations') continue;
      if (!Array.isArray(p[group])) { errors.push(`${label}: invalid ${group}`); continue; }
      resources.push(...p[group]);
      for (const recommendation of p[group]) {
        const project = projects.find(x => x.id === recommendation.projectId);
        if (!project || (p.published && !project.published)) errors.push(`${label}: missing or unpublished project ${recommendation.projectId}`);
        requireText(recommendation, 'explanation', label);
        if (recommendation.usageNotes !== undefined) requireText(recommendation, 'usageNotes', label);
      }
    }
    unique(resources, 'projectId', label);
    if (p.relatedPathways !== undefined) {
      if (!Array.isArray(p.relatedPathways)) errors.push(`${label}: invalid relatedPathways`);
      else {
        unique(p.relatedPathways, 'pathwayId', label);
        for (const related of p.relatedPathways) {
          const pathway = pathways.find(x => x.id === related.pathwayId);
          if (!pathway || (p.published && !pathway.published)) errors.push(`${label}: missing or unpublished related pathway ${related.pathwayId}`);
          if (related.pathwayId === p.id) errors.push(`${label}: cannot relate a pathway to itself`);
          requireText(related, 'explanation', label);
        }
      }
    }
    for (const [key, value] of new URLSearchParams(p.relatedCatalogueQuery)) if (!['subject','type','q'].includes(key) || (key === 'subject' && !Object.hasOwn(subjects, value)) || (key === 'type' && !Object.hasOwn(types, value))) errors.push(`${label}: unsupported related filter`);
    if (p.published) reviewed(p, label);
  }
  if (inventory) {
    unique(inventory.repositories, 'repository', 'Inventory');
    for (const item of inventory.repositories) {
      if (!item.reason || !['included','excluded'].includes(item.disposition)) errors.push(`Inventory: missing decision for ${item.repository}`);
      const record = projects.find(p => p.links?.repository === item.url);
      if (item.disposition === 'included' && !record?.published) errors.push(`Inventory: missing published record ${item.repository}`);
      if (item.disposition === 'excluded' && record?.published) errors.push(`Inventory: excluded record is published ${item.repository}`);
    }
    for (const project of projects.filter(p => p.published)) if (!inventory.repositories.some(i => i.url === project.links.repository)) errors.push(`Inventory: untracked project ${project.id}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
}

export function loadContent() {
  const projects = readJSON('content/projects.json');
  const pathways = readJSON('content/pathways.json');
  validateContent(projects, pathways, readJSON('content/inventory.json'));
  return { projects: projects.filter(p => p.published).sort((a,b) => a.name.localeCompare(b.name, 'en')), featuredProjects: projects.filter(p => p.published && p.featured), pathways: pathways.filter(p => p.published) };
}
