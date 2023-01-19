const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyTestdatabase", 3);
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("product")) {
        db.createObjectStore("product", { keyPath: "id" });
      }
    };
  });
};

export default openDatabase;
