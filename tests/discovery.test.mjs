import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesProject, parseState, serializeState } from '../src/discovery.mjs';

const population = {id:'population',name:'Population explorer',summary:'Population estimates and age profiles',coverage:'United Kingdom',subjects:['people','places'],types:['data-package'],keywords:['demography','R']};
const index = {id:'index',name:'Index Builder',summary:'Combine indicators',coverage:'Your own data',subjects:['methods'],types:['app','method-toolkit'],keywords:['weights']};
const filter = (state) => [population,index].filter(p=>matchesProject(p,state)).map(p=>p.id);

test('search combines terms across indexed fields, ignores case and trims whitespace',()=>{
  assert.deepEqual(filter(parseState('?q=%20%20POPULATION%20kingdom%20demography%20%20')),['population']);
  assert.deepEqual(filter(parseState('?q=population+unknown')),[]);
  assert.deepEqual(filter(parseState('?q=++')),['population','index']);
});
test('values within facets use OR; search and different facets use AND without duplicates',()=>{
  assert.deepEqual(filter(parseState('?subject=people&subject=places')),['population']);
  assert.deepEqual(filter(parseState('?subject=people&subject=methods&type=app')),['index']);
  assert.deepEqual(filter(parseState('?q=population&type=app')),[]);
  assert.deepEqual(filter(parseState('?type=app&type=method-toolkit')),['index']);
});
test('shared URLs round-trip, safely discard unknown enum values and retain literal query text',()=>{
  const state = parseState('?q=%3Cscript%3E+%26+test&subject=places&subject=places&subject=vulnerability&type=app&type=invalid');
  assert.deepEqual(state,{q:'<script> & test',subjects:['places'],types:['app']});
  assert.deepEqual(parseState(serializeState(state)),state);
  assert.deepEqual(parseState('?subject=__proto__&type=constructor'),{q:'',subjects:[],types:[]});
});
