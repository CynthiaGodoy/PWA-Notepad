import { openDB } from 'idb';

const initdb = async () =>
  //NEW DATABASE NAMED JATE / VERSION 1
  openDB('jate', 1, {
    //ADD OUR DATABASE SCHEMA IF IT HAS NOT ALREADY BEEN INITIALIZED
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //CREATE A NEW OBJECT STORE FOR THE DATA AND GIVE IT A KEY NAME OF ID WHICH NEEDS AN INCREMENT AUTOMATICALLY
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//EXPORT A FUNCTION TO POST TO THE DATABASE
export const putDb = async (content) => {
  console.log('putDb not implemented');
  //CREATE A CONNECTION TO THE DATABASE
  const jateDb = await openDB('jate', 1);
  //CREATE A NEW TRANSACTION AND SPECIFY THE DATABASE AND DATA PRIVILEGES
  const tx = jateDb.transaction('jate', 'readwrite');
  //OPEN UP THE DESIRED OBJECT STORE
  const store = tx.objectStore('jate');
  //USE THE PUT() METHOD ON THE STORE AND PASS THE CONTENT
  const request = store.put({ id: 1, value: content });
  //GET CONFIRMATION OF THE REQUEST
  const result = await request;
  console.log('data saved to database', result);
};
;

// EXPORT A FUNCTION WE WILL USE TO GET TO THE DATABASE
export const getDb = async () => {
  console.log('getDb not implemented');
  //CREATE A CONNECTION TO THE DATABASE
  const jateDb = await openDB('jate', 1);
  //CREATE A NEW TRANSACTION AND SPECIFY THE DATABASE AND DATA PRIVILEGES
  const tx = jateDb.transaction('jate', 'readonly');
  //OPEN UP THE DESIRED OBJECT STORE
  const store = tx.objectStore('jate');
  //USE THE GETALL() METHOD TO GET ALL DATA IN THE DATABASE
  const request = store.getAll(1);
  //GET CONFIRMATION OF THE REQUEST
  const result = await request;
  console.log('result.value', result);
  return result;
};

//START THE DATABASE
initdb();
