/**
 * indexDB缓存图片
 */
// IndexedDB
let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
  IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;

let dbName = 'hfoffice_db' // 数据库名称
let tableName = 'elephant' // 表名称

// 创建/打开数据库
function openDB(name = dbName, version = 1) {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.log('您的浏览器不支持indexDB');
      return;
    }
    var indexDBRequest = window.indexedDB.open(name, version);
    indexDBRequest.onerror = function (e) {
      console.log('数据库打开失败!');
      reject()
    }
    indexDBRequest.onsuccess = function (e) {
      let db = indexDBRequest.result;
      // console.log('创建/打开数据库成功');
      resolve(db)
    }
    indexDBRequest.onupgradeneeded = function (e) {
      let db = indexDBRequest.result;
      openStore(db)
    }
  })

}

// 添加表
function openStore(db, storeName = tableName) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { keyPath: 'id' });
  }
}

// 添加数据
async function addData(data, storeName = tableName) {
  let db = await openDB()
  var transaction = db.transaction([storeName], 'readwrite');
  var store = transaction.objectStore(storeName);
  store.add(data);
}

// 根据主键搜索数据
async function getDataByKey(key, storeName = tableName) {
  let db = await openDB()
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);
    var dataRequest = store.get(key);
    dataRequest.onsuccess = function (e) {
      var data = e.target.result;
      resolve(data)
    }
  })

}

// 清除数据
async function clearObjectStore(storeName = tableName) {
  let db = await openDB()
  var transaction = db.transaction([storeName], 'readwrite');
  var store = transaction.objectStore(storeName);
  store.clear();
}

// 根据主键删除数据
async function deleteDataByKey(key, storeName = tableName) {
  let db = await openDB()
  var transaction = db.transaction([storeName], 'readwrite');
  var store = transaction.objectStore(storeName);
  var deleteRequest = store.delete(key);
  // deleteRequest.onsuccess = function (e) {
  //   console.log('删除成功', store);
  // }
  // deleteRequest.onerror = function (e) {
  //   console.log('删除失败', store);
  // }
}

// 根据主键修改数据
async function putDataByKey(data, storeName = tableName) {
  let db = await openDB()
  let transaction = db.transaction([storeName], "readwrite");
  let store = transaction.objectStore(storeName)
  store.put(data)
}


// 获取图片文件
function getImageFile(url = "https://img01.yzcdn.cn/vant/cat.jpeg") {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest(), blob;
    xhr.open("GET", url);
    xhr.responseType = "blob";
    // xhr.responseType = 'arraybuffer';
    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        let blob = xhr.response;
        resolve(blob)
      }
    }, false);
    xhr.send();
  })
}

// getImageFile().then((data) => {
//   addData({ id: "2", value: data })
// })

// 使用示例
// addData({ id: "2", value: "小飞棍" })
// addData({ id: "3", value: "小飞棍" })
// deleteDataByKey('2')
// getDataByKey("2").then(data => {
//   var imgFile = data.value;
//   var imgURL = window.URL.createObjectURL(new Blob([imgFile]));
//   appendImgToDom(imgURL)
// })
// clearObjectStore()


function appendImgToDom(imgURL) {
  // var imgElephant = document.createElement('img')
  var imgElephant = document.querySelector('img')
  imgElephant.setAttribute("src", imgURL)
  // document.body.appendChild(imgElephant)
  imgElephant.onload = function () {
    URL.revokeObjectURL(imgURL);
  }
}

// 图片缓存到本地
async function getImage(id, url) {
  let data = await getDataByKey(id)
  let imgFile = ""
  // 未缓存
  if (!data) {
    let value = await getImageFile(url)
    addData({ id, value })
    imgFile = value
  }
  // 已缓存
  else {
    imgFile = await data.value
  }
  let blobUrl = window.URL.createObjectURL(new Blob([imgFile]));
  return blobUrl
}

let data = [{
  id: "1",
  url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
},
{
  id: "2",
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
},
{
  id: "3",
  url: "https://img01.yzcdn.cn/vant/cat.jpeg"
},
]
// https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg
// https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg
// https://img01.yzcdn.cn/vant/cat.jpeg
async function main(index = 0) {
  let url = await getImage(data[index].id, data[index].url)
  appendImgToDom(url)
}

main()

