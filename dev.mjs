import fs from 'fs';
import http from 'http';
import build from './build.mjs';

fs.watch('./posts', build);

http.createServer((req, res) => {
  let path = './build' + req.url;

  if (path.split('.').length < 3) {
    path += '/index.html';
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080, () => console.log('Server listening on http://localhost:8080'));
