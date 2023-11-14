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
      'CREATE TABLE IF NOT EXISTS saved_articles (url STRING PRIMARY KEY, title STRING, author STRING, urlToImage STRING, publishedAt STRING)',
    );
  });
};

const insertArticle = (articleUrl, title, author, urlToImage, publishedAt) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO saved_articles (url, title, author, urlToImage, publishedAt) VALUES (?, ?, ?, ?, ?)',
      [articleUrl, title, author, urlToImage, publishedAt],
      () => console.log('Article inserted successfully'),
      error => console.error('Error inserting article', error),
    );
  });
};

const deleteArticle = articleUrl => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM saved_articles WHERE url = ?',
      [articleUrl],
      () => console.log('Article deleted successfully'),
      error => console.error('Error deleting article', error),
    );
  });
};

const fetchData = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT url, title, author, urlToImage, publishedAt FROM saved_articles',
      [],
      (tx, results) => {
        const len = results.rows.length;
        const articles = [];
        for (let i = 0; i < len; i++) {
          const item = results.rows.item(i);
          articles.push({
            url: item.url,
            title: item.title,
            author: item.author,
            urlToImage: item.urlToImage,
            publishedAt: item.publishedAt,
          });
        }
        callback(articles);
      },
      error => console.error('Error fetching saved articles', error),
    );
  });
};

export {initDatabase, insertArticle, deleteArticle, fetchData};
