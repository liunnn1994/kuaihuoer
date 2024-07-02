/**
 * @description 压缩输出目录
 */
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import archiver from 'archiver';

const output = createWriteStream(resolve(process.cwd(), 'output.zip'));

const archive = archiver('zip', {
  zlib: { level: 9 }, // 设置压缩等级
});

output.on('close', function () {
  console.log('压缩完成，共计 ' + archive.pointer() + ' 字节');
  console.log('压缩完成');
});

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.warn('---------------------------警告---------------------------', err);
  } else {
    throw err;
  }
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

archive.directory(resolve(process.cwd(), '.output/'), '.output');

archive.finalize();
