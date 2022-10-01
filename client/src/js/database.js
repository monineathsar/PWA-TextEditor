import { openDB } from 'idb';

const jateDatabaseId = 1;

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const database = await openDB('jate', 1);
  const transcation = database.transaction('jate', 'readwrite');
  const storeObject = transcation.objectStore('jate');
  const request = storeObject.put({id: jateDatabaseId, value: content});
  const result = await request;
  console.log('Data is saved to database! ', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const database = await openDB('jate', 1);
  const transcation = database.transaction('jate', 'readonly');
  const storeObject = transcation.objectStore('jate');
  const request = storeObject.get(jateDatabaseId);
  const result = await(request);
  return result?.value;
};

initdb();
