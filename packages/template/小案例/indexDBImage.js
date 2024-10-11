(function () {
  // IndexedDB
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
    dbVersion = 1.0;

  // Create/open database
  var request = indexedDB.open("elephantFiles", dbVersion),
    db,
    createObjectStore = function (dataBase) {
      // Create an objectStore
      console.log("Creating objectStore")
      dataBase.createObjectStore("elephants");
    },

    getImageFile = function () {
      // Create XHR
      var xhr = new XMLHttpRequest(),
        blob;

      xhr.open("GET", "https://img01.yzcdn.cn/vant/cat.jpeg", true);
      // Set the responseType to blob
      xhr.responseType = "blob";

      xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
          console.log("Image retrieved");

          // Blob as response
          blob = xhr.response;
          console.log("Blob:" + blob);

          // Put the received blob into IndexedDB
          putElephantInDb(blob);
        }
      }, false);
      // Send XHR
      xhr.send();
    },

    putElephantInDb = function (blob) {
      var transaction = db.transaction(["elephants"], "readwrite");
      var put = transaction.objectStore("elephants").put(blob, "image");
      transaction.objectStore("elephants").get("image").onsuccess = function (event) {
        var imgFile = event.target.result;
        var URL = window.URL || window.webkitURL;
        var imgURL = URL.createObjectURL(new Blob([imgFile]));
        var imgElephant = document.createElement('img')
        imgElephant.setAttribute("src", imgURL);
        URL.revokeObjectURL(imgURL);
        imgElephant.remove()
      };
    };

  request.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database");
  };

  request.onsuccess = function (event) {
    console.log("Success creating/accessing IndexedDB database");
    db = request.result;

    db.onerror = function (event) {
      console.log("Error creating/accessing IndexedDB database");
    };

    // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    if (db.setVersion) {
      if (db.version != dbVersion) {
        var setVersion = db.setVersion(dbVersion);
        setVersion.onsuccess = function () {
          createObjectStore(db);
          getImageFile();
        };
      }
      else {
        getImageFile();
      }
    }
    else {
      getImageFile();
    }
  }

  // For future use. Currently only in latest Firefox versions
  request.onupgradeneeded = function (event) {
    createObjectStore(event.target.result);
  };
})()