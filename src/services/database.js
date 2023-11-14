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
      'CREATE TABLE IF NOT EXISTS saved_articles (url STRING PRIMARY KEY)',
    );
  });
};

const insertArticleUrl = articleUrl => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO saved_articles (url) VALUES (?)',
      [articleUrl],
      () => console.log('Article URL inserted successfully'),
      error => console.error('Error inserting article URL', error),
    );
  });
};

const deleteArticleUrl = articleUrl => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM saved_articles WHERE url = ?',
      [articleUrl],
      () => console.log('Article URL deleted successfully'),
      error => console.error('Error deleting article URL', error),
    );
  });
};

const fetchData = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT url FROM saved_articles',
      [],
      (tx, results) => {
        const len = results.rows.length;
        const urls = [];
        for (let i = 0; i < len; i++) {
          urls.push(results.rows.item(i).url);
        }
        callback(urls);
      },
      error => console.error('Error fetching saved article URLs', error),
    );
  });
};

export {initDatabase, insertArticleUrl, deleteArticleUrl, fetchData};
