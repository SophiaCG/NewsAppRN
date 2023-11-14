// screens/BookmarkedScreen.js
import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {
  initDatabase,
  insertArticleUrl,
  deleteArticleUrl,
  fetchData,
} from '../services/database';
import ArticleItem from '../components/ArticleItem';

const BookmarkedScreen = ({navigation}) => {
  const [savedUrls, setSavedUrls] = useState([]);

  useEffect(() => {
    initDatabase();
    updateSavedUrls();
  }, []);

  const updateSavedUrls = () => {
    fetchData(urls => {
      setSavedUrls(urls);
    });
  };

  const isArticleSaved = articleUrl => savedUrls.includes(articleUrl);

  const handleSaveUrl = articleUrl => {
    insertArticleUrl(articleUrl);
    updateSavedUrl();
  };

  const handleDeleteUrl = articleUrl => {
    deleteArticleUrl(articleUrl);
    updateSavedUrl();
  };

  const handleBookmarkPress = articleUrl => {
    if (isArticleSaved(articleUrl)) {
      handleDeleteUrl(articleUrl);
    } else {
      handleSaveUrl(articleUrl);
    }
    updateSavedUrl();
  };

  const renderArticleItem = ({item}) => (
    <ArticleItem
      article={item}
      isSaved={isArticleSaved(item.url)}
      onPressBookmark={handleBookmarkPress}
    />
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={savedUrls}
        keyExtractor={item => item}
        renderItem={renderArticleItem}
        style={{width: '95%'}}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

export default BookmarkedScreen;
