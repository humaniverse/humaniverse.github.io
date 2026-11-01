import { parseState, serializeState, matchesProject, subjects, types } from './discovery.mjs';

const data = JSON.parse(document.getElementById('catalogue-data').textContent);
const search = document.getElementById('project-search');
const checkboxes = [...document.querySelectorAll('.filters input')];
const rows = [...document.querySelectorAll('[data-project-id]')];
const count = document.getElementById('result-count');
const active = document.getElementById('active-filters');
const filters = document.querySelector('.filters');
const clear = document.getElementById('clear-filters');
const resetAll = document.getElementById('reset-all');
let state = parseState(location.search);
let timer;

function updateURL(mode) {
  const query = serializeState(state);
  const url = location.pathname + (query ? '?' + query : '') + location.hash;
  if (url !== location.pathname + location.search + location.hash) history[mode + 'State'](null, '', url);
}
function render(syncSearch = false) {
  if (syncSearch) search.value = state.q;
  checkboxes.forEach(input => { input.checked = (input.name === 'subject' ? state.subjects : state.types).includes(input.value); });
  const matching = new Set(data.filter(project => matchesProject(project,state)).map(p => p.id));
  const query = serializeState(state);
  rows.forEach(row => {
    row.hidden = !matching.has(row.dataset.projectId);
    const link = row.querySelector('[data-project-path]');
    link.href = link.dataset.projectPath + (query ? '?from=' + encodeURIComponent(query) : '');
  });
  count.textContent = `${matching.size} ${matching.size === 1 ? 'project' : 'projects'}${matching.size !== data.length || query ? ` of ${data.length}` : ''}`;
  const selectedCount = state.subjects.length + state.types.length;
  document.getElementById('filter-number').textContent = selectedCount ? ` (${selectedCount})` : '';
  clear.disabled = selectedCount === 0;
  resetAll.hidden = !query;
  document.getElementById('no-results').hidden = matching.size !== 0;
  const chips = [];
  for (const [key,vocab] of [['subjects',subjects],['types',types]]) for (const value of state[key]) {
    const chip = document.createElement('button');
    chip.type = 'button'; chip.className = 'filter-chip';
    chip.setAttribute('aria-label',`Remove ${vocab[value]} filter`);
    chip.append(document.createTextNode(vocab[value] + ' '));
    const cross = document.createElement('span');cross.textContent = '×';cross.setAttribute('aria-hidden','true');chip.append(cross);
    chip.addEventListener('click',() => {
      const index = [...active.children].indexOf(chip);
      clearTimeout(timer); state[key] = state[key].filter(x=>x!==value); state.q=search.value.trim();
      updateURL('push');render();
      (active.children[Math.min(index,active.children.length-1)] || search).focus();
    });
    chips.push(chip);
  }
  active.replaceChildren(...chips);
  active.hidden = !chips.length;
}
search.addEventListener('input',() => {
  clearTimeout(timer);
  timer = setTimeout(()=> {state.q=search.value.trim();updateURL('replace');render();},200);
});
checkboxes.forEach(input=>input.addEventListener('change',()=> {
  clearTimeout(timer);
  state = { q:search.value.trim(),subjects:checkboxes.filter(i=>i.name==='subject'&&i.checked).map(i=>i.value),types:checkboxes.filter(i=>i.name==='type'&&i.checked).map(i=>i.value) };
  updateURL('push');render();
}));
clear.addEventListener('click',()=> {clearTimeout(timer);state={q:search.value.trim(),subjects:[],types:[]};updateURL('push');render();search.focus();});
function reset() { clearTimeout(timer);state={q:'',subjects:[],types:[]};updateURL('push');render(true);search.focus(); }
resetAll.addEventListener('click',reset);document.getElementById('reset-empty').addEventListener('click',reset);
window.addEventListener('popstate',()=>{clearTimeout(timer);state=parseState(location.search);render(true);});
const wide = matchMedia('(min-width: 960px)');
filters.open = wide.matches;
wide.addEventListener('change',event=>{filters.open=event.matches;});
document.querySelectorAll('[data-enhanced]').forEach(el=>{el.hidden=false;});
render(true);
