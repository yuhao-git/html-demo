const Fontmin = require('fontmin');
const fs = require('fs');
const path = require('path');

// 字体文件夹路径和输出文件夹路径
const fontFolder = './fonts';
const outputFolder = './newFont';

// 从文件中读取要保留的字符列表
fs.readFile('./7000常用字.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // 保留指定字符
  const keepChars = data.trim(); // 去除空白字符

  // 获取字体文件夹中的所有文件
  fs.readdir(fontFolder, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // 遍历每个字体文件并处理
    files.forEach((file) => {
      const fontFile = path.join(fontFolder, file);

      // 创建 Fontmin 实例
      const fontmin = new Fontmin()
        .src(fontFile) // 设置要处理的字体文件
        .use(Fontmin.glyph({ text: keepChars })) // 保留指定字符
        .dest(outputFolder); // 输出到新字体文件夹

      // 执行字体文件的精简
      fontmin.run((err, files) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Font ${file} minified successfully!`);
          // 处理后的字体文件在输出路径中
        }
      });
    });
  });
});
