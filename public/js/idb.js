let db;

const request = indexedDB.open('Budget-Tracker-PWA', 1);

// event will emit if db version changes
request.onupgradeneeded = function(event) {
  // save a reference to the db
  const db = event.target.result;
  // creates an object store called 'new_session'
  db.createObjectStore('new_session', { autoIncrement: true });
};

// upon a successful creation
request.onsuccess = function(event) {
  // when db is created 
  db = event.target.result;

  // check if app is online, if so run "uploadSession()" function
  if (navigator.online) {
    // code pending here...
    // uploadSession();
  }
};

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};

// saveSession will execute if the session has no network connection
function saveSession(record) {
  // open a new transaction with db read & write permissions
  const transaction = db.transaction(['new_session'], 'readwrite');

  // access the object store for 'new_session'
  const sessionObjectStore = transaction.objectStore('new_session');

  // add record to store with add method
  sessionObjectStore.add(record);
};

function uploadSession() {
  // open a transaction on the db
  const transaction = db.transaction(['new_session'], 'readwrite');

  // access object store
  const sessionObjectStore = transaction.objectStore('new_session');

  // get all records from store & set to a variable
  const getAll = sessionObjectStore.getAll();

  // code pending for here...
};

// listen for app coming back online
window.addEventListener('online', sendTransaction);