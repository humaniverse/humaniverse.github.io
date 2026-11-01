import { parseState, serializeState } from './discovery.mjs';
const prior = new URLSearchParams(location.search).get('from');
if (prior && prior.length < 3000) {
  const query = serializeState(parseState(prior));
  if (query) document.querySelectorAll('[data-catalogue-back]').forEach(link => {link.href = '/catalogue/?' + query;});
}
