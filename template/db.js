/**
 * indexDB缓存图片
 */

//  putElephantInDb = function (blob) {
//   var transaction = db.transaction(["elephants"], "readwrite");
//   var put = transaction.objectStore("elephants").put(blob, "image");
//   transaction.objectStore("elephants").get("image").onsuccess = function (event) {
//     var imgFile = event.target.result;
//     var URL = window.URL || window.webkitURL;
//     var imgURL = URL.createObjectURL(new Blob([imgFile]));
//     var imgElephant = document.createElement('img')
//     imgElephant.setAttribute("src", imgURL);
//     URL.revokeObjectURL(imgURL);
//     imgElephant.remove()
//   };
// };

// IndexedDB
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
  IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
  dbVersion = 1.0;

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
function getImageFile(url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg") {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest(), blob;
    xhr.open("GET", url, false);
    xhr.responseType = "blob";
    // xhr.responseType = 'arraybuffer';
    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        let blob = xhr.response;
        
        resolve(blob)

        blob = new Blob([blob])
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);

        console.log(blob)

      }
    }, false);
    xhr.send();

    // let imgElephant = document.createElement('img')
    // imgElephant.setAttribute("src", url)
    // imgElephant.onload = function (e) {
    //   console.log(e.target)
    //   let dom = e.target
    //   let blob = new Blob([dom])
    //   console.log(blob)
    // }


  })
}

getImageFile().then((data) => {
  addData({ id: "2", value: data })
})



// 使用示例
// addData({ id: "2", value: "小飞棍" })
// addData({ id: "3", value: "小飞棍" })
// deleteDataByKey('2')
// getDataByKey("2").then(data => {
//   var imgFile = data.value;
//   // console.log(data.value)

//   var URL = window.URL || window.webkitURL;
//   var imgURL = URL.createObjectURL(new Blob([imgFile]));

//   console.log(imgURL)
//   var imgElephant = document.createElement('img')
//   imgElephant.setAttribute("src", imgURL)
//   URL.revokeObjectURL(imgURL);
//   document.body.appendChild(imgElephant)
// })
// clearObjectStore()