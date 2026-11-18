import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {join, resolve, extname} from 'node:path';
const root = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname);
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
createServer(async (req,res)=>{
  const path = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = resolve(join(root, path === '/' ? 'index.html' : path.replace(/^\/+/,'')));
  if (file !== root && !file.startsWith(root + '/')) {res.writeHead(403).end('Forbidden'); return;}
  try {if (!(await stat(file)).isFile()) throw new Error('not a file');
    res.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream'});
    res.end(await readFile(file));
  } catch {res.writeHead(404).end('Not found');}
}).listen(4173, ()=>console.log('Preview: http://localhost:4173'));
