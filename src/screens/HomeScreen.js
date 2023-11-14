import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import config from '../../config';
import {
  initDatabase,
  insertArticle,
  deleteArticle,
  fetchData,
} from '../services/database';
import ArticleItem from '../components/ArticleItem';
import FirstArticle from '../components/FirstArticle';

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
  const [savedArticles, setSavedArticles] = useState([]);
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
    updateSavedArticles();
  }, []);

  const isArticleSaved = articleUrl =>
    savedArticles.some(article => article.url === articleUrl);

  const updateSavedArticles = () => {
    fetchData(articles => {
      setSavedArticles(articles);
    });
  };

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
      const articleToSave = articles.find(
        article => article.url === articleUrl,
      );
      if (articleToSave) {
        handleSaveArticle(articleToSave);
      }
    }
    updateSavedArticles();
  };

  const RenderArticleItem = ({item}) => (
    <ArticleItem
      article={item}
      isSaved={isArticleSaved(item.url)}
      onPressBookmark={() => handleBookmarkPress(item.url)}
    />
  );

  const RenderFirstArticle = () => (
    <FirstArticle
      article={articles[0]}
      isSaved={isArticleSaved(articles[0]?.url)}
      onPressBookmark={() => handleBookmarkPress(articles[0]?.url)}
    />
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        ListHeaderComponent={RenderFirstArticle}
        data={articles.slice(1)}
        keyExtractor={item => item.url}
        renderItem={RenderArticleItem}
        style={{width: '95%'}}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
}

export default HomeScreen;
