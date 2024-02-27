const fs = require('fs');
const posthtml = require('posthtml');
const css = require('css');

// CSS属性单词数组
const cssWords = [
  'align', 'all', 'animation', 'backface', 'background', 'border', 'bottom', 
  'box', 'break', 'caption', 'caret', 'charset', 'clear', 'clip', 'color', 
  'column', 'columns', 'content', 'counter', 'cue', 'cursor', 'direction', 
  'display', 'empty', 'filter', 'flex', 'float', 'font', 'grid', 'height', 
  'hyphens', 'image', 'justify', 'left', 'letter', 'line', 'list', 'margin', 
  'max', 'min', 'mix', 'object', 'opacity', 'order', 'outline', 'overflow', 
  'padding', 'page', 'perspective', 'pointer', 'position', 'quotes', 'resize', 
  'right', 'space', 'table', 'tab', 'text', 'top', 'transform', 'transition', 
  'unicode', 'vertical', 'visibility', 'white', 'width', 'word', 'z', 'zoom'  
];

// 转换属性名为带短横线形式
function convertPropToDashCase(prop) {
  if (/-/.test(prop)) return prop.toLowerCase();

  let result = '';
  for (let i = 0; i < prop.length;) {
    let found = false;

    let maxWordLen = cssWords.reduce((maxLen, word) => {
      if (prop.slice(i, i + word.length).toLowerCase() === word) {
        maxLen = Math.max(maxLen, word.length);
      }
      return maxLen;
    }, 0);

    if (maxWordLen > 0) {
      if (result) result += '-';
      result += prop.slice(i, i + maxWordLen).toLowerCase();
      i += maxWordLen;
    } else {
      throw new Error(`Unknown property name part in ${prop}`);
    }
  }

  return result;
}

const processStyleProperty = (props) => {
  const cssObj = css.parse(`style { ${props} }`);
  const rules = cssObj.stylesheet.rules[0].declarations;

  rules.forEach((rule) => {
    rule.property = convertPropToDashCase(rule.property);
    rule.before = '';
    rule.between = ':';
    rule.after = '';
  });

  const processedCSS = css.stringify(cssObj, { compress: true }).trim();
  // Remove `style {` and `}` and trailing semicolon
  return processedCSS.slice(6, -1).trim();
};

fs.readFile('./left.vue', 'utf8', (err, data) => {
  if (err) throw err;

  posthtml()
  .use(tree => {
    tree.match({ attrs: { style: true } }, node => {
      const newNode = JSON.parse(JSON.stringify(node));  // 创建 node 的副本
      newNode.attrs.style = processStyleProperty(newNode.attrs.style);
      return newNode;
    });
  })
  .process(data, { closingSingleTag: 'default' })
  .then(result => {
    fs.writeFile('./final.vue', result.html, 'utf8', err => {
      if (err) throw err;
      console.log('The style names have been converted successfully!');
    });
  });
});
