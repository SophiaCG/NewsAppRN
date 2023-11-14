// screens/BookmarkedScreen.js
import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {
  initDatabase,
  insertArticle,
  deleteArticle,
  fetchData,
} from '../services/database';
import ArticleItem from '../components/ArticleItem';

const BookmarkedScreen = ({navigation}) => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    initDatabase();
    updateSavedArticles();
  }, []);

  const updateSavedArticles = () => {
    fetchData(articles => {
      setSavedArticles(articles);
    });
  };

  const isArticleSaved = articleUrl =>
    savedArticles.some(article => article.url === articleUrl);

  const handleSaveArticle = article => {
    insertArticle(
      article.url,
      article.title,
      article.author,
      article.urlToImage,
      article.publishedAt,
    );
    updateSavedArticles();
  };

  const handleDeleteArticle = articleUrl => {
    deleteArticle(articleUrl);
    updateSavedArticles();
  };

  const handleBookmarkPress = articleUrl => {
    if (isArticleSaved(articleUrl)) {
      handleDeleteArticle(articleUrl);
    } else {
      const articleToSave = savedArticles.find(
        article => article.url === articleUrl,
      );
      if (articleToSave) {
        handleSaveArticle(articleToSave);
      }
    }
    updateSavedArticles();
  };

  const renderArticleItem = ({item}) => (
    <ArticleItem
      article={item}
      isSaved={isArticleSaved(item.url)}
      onPressBookmark={() => handleBookmarkPress(item.url)}
    />
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={savedArticles}
        keyExtractor={item => item.url}
        renderItem={renderArticleItem}
        style={{width: '95%'}}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

export default BookmarkedScreen;
