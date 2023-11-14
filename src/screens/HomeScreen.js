import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import config from '../../config';
import {
  initDatabase,
  insertArticleUrl,
  deleteArticleUrl,
  fetchData,
} from '../services/database';
import ArticleItem from '../components/ArticleItem';
import FirstArticle from '../components/FirstArticle';

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
  const [savedUrls, setSavedUrl] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
      );
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    initDatabase();
    updateSavedUrl();
  }, []);

  const isArticleSaved = articleUrl => savedUrls.includes(articleUrl);

  const updateSavedUrl = () => {
    fetchData(urls => {
      setSavedUrl(urls);
    });
  };

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

  const renderFirstArticle = () => (
    <FirstArticle
      article={articles[0]}
      isSaved={isArticleSaved(articles[0])}
      onPressBookmark={handleBookmarkPress}
    />
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        ListHeaderComponent={renderFirstArticle}
        data={articles.slice(1)} // Exclude the first article
        keyExtractor={item => item.url}
        renderItem={renderArticleItem}
        style={{width: '95%'}}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
}

export default HomeScreen;
