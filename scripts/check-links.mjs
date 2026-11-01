import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { root, loadContent } from './content.mjs';

const {projects}=loadContent();
const urls=[...new Set([
  ...projects.flatMap(p=>Object.values(p.links)),
  'https://github.com/humaniverse',
  'https://github.com/humaniverse/humaniverse.github.io',
  'https://github.com/humaniverse/humaniverse.github.io/issues',
  'https://humaniverse.r-universe.dev/packages'
])];
const results=[];
async function check(url) {
  try {
    let response=await fetch(url,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(20000)});
    if ([403,405,202].includes(response.status)) response=await fetch(url,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(20000)});
    const status=response.status;
    await response.body?.cancel();
    return {url,httpStatus:status,finalURL:response.url,result:status===200?'passed':'review-required'};
  } catch(error) {return {url,result:'review-required',error:error.message};}
}
let index=0;
await Promise.all(Array.from({length:6},async()=>{while(index<urls.length){const current=index++;results[current]=await check(urls[current]);console.log(`${results[current].result}: ${urls[current]} (${results[current].httpStatus??results[current].error})`);}}));
const report={checkedAt:new Date().toISOString(),note:'HTTP checks verify destinations, not app calculations or content freshness. Non-200 responses require manual review; never remove a record on one failed request.',results};
writeFileSync(resolve(root,'docs/link-checks.json'),JSON.stringify(report,null,2)+'\n');
const failed=results.filter(r=>r.result!=='passed');
console.log(`${results.length-failed.length}/${results.length} destinations returned HTTP 200; ${failed.length} require review. Report: docs/link-checks.json`);
if(failed.length) process.exitCode=1;
