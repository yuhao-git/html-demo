const fs  = require('fs');

// let str = fs.readFileSync('objData.txt',{encoding: 'utf8'})
const stat = fs.existsSync('bjData.txt')

console.log(stat)