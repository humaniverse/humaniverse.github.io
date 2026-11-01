import http from 'node:http';
import { readFileSync, statSync, watch } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { buildSite } from './build.mjs';
import { root } from './content.mjs';

buildSite();
const dist = resolve(root, 'dist');
const port = Number(process.env.PORT || 4175);
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.woff2':'font/woff2' };
const server = http.createServer((req,res)=>{
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(dist, '.' + path);
    if (file !== dist && !file.startsWith(dist + sep)) {res.writeHead(403).end('Forbidden');return;}
    if (statSync(file).isDirectory()) {
      if (!path.endsWith('/')) {res.writeHead(301,{Location:path+'/' + new URL(req.url,'http://localhost').search}).end();return;}
      file = resolve(file, 'index.html');
    }
    res.writeHead(200,{'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(readFileSync(resolve(dist,'404.html')));
  }
});
server.listen(port, '127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));
let timer;
for (const folder of ['src','content','public']) watch(resolve(root,folder),{recursive:true},()=>{
  clearTimeout(timer);timer=setTimeout(()=>{try {buildSite();}catch(error){console.error(error.message);}},120);
});
