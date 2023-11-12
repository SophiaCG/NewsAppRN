import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'news.db',
    location: 'default',
  },
  () => {
    console.log('Database connected!');
  }, //on success
  error => console.log('Database error', error), //on error
);

const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS saved_articles (id INTEGER PRIMARY KEY)',
    );
  });
};

const insertArticleId = articleId => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO saved_articles (id) VALUES (?)',
      [articleId],
      () => console.log('Article ID inserted successfully'),
      error => console.error('Error inserting article ID', error),
    );
  });
};

const deleteArticleId = articleId => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM saved_articles WHERE id = ?',
      [articleId],
      () => console.log('Article ID deleted successfully'),
      error => console.error('Error deleting article ID', error),
    );
  });
};

const fetchData = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT id FROM saved_articles',
      [],
      (tx, results) => {
        const len = results.rows.length;
        const ids = [];
        for (let i = 0; i < len; i++) {
          ids.push(results.rows.item(i).id);
        }
        callback(ids);
      },
      error => console.error('Error fetching saved article IDs', error),
    );
  });
};

export {initDatabase, insertArticleId, deleteArticleId, fetchData};
