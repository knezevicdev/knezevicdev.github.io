import fs from 'fs';
import path from 'path';

const copyFiles = (src, dest, root = true) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!root) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyFiles(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        false
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

export default copyFiles;
