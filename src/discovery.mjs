export const subjects = { people: 'People', places: 'Places', risks: 'Risks', methods: 'Methods' };
export const types = { app: 'App', 'data-package': 'Data package', dataset: 'Dataset', 'method-toolkit': 'Method toolkit', 'research-project': 'Research project' };

export function parseState(search = '') {
  const params = new URLSearchParams(search);
  return {
    q: (params.get('q') || '').trim(),
    subjects: [...new Set(params.getAll('subject').filter(value => Object.hasOwn(subjects, value)))],
    types: [...new Set(params.getAll('type').filter(value => Object.hasOwn(types, value)))]
  };
}

export function serializeState(state) {
  const params = new URLSearchParams();
  if (state.q.trim()) params.set('q', state.q.trim());
  for (const subject of state.subjects) if (Object.hasOwn(subjects, subject)) params.append('subject', subject);
  for (const type of state.types) if (Object.hasOwn(types, type)) params.append('type', type);
  return params.toString();
}

export function matchesProject(project, state) {
  const index = [project.name, project.summary, project.coverage, ...project.subjects.flatMap(s => [s, subjects[s]]), ...(project.keywords || [])].join(' ').toLocaleLowerCase('en');
  const terms = state.q.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
  return terms.every(term => index.includes(term))
    && (!state.subjects.length || state.subjects.some(subject => project.subjects.includes(subject)))
    && (!state.types.length || state.types.some(type => project.types.includes(type)));
}
