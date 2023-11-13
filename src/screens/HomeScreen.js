import React, {useState, useEffect} from 'react';
import {Button, View, Text, Image, FlatList} from 'react-native';
import config from '../../config';
import styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-regular-svg-icons/faBookmark';
import {
  initDatabase,
  insertArticleId,
  deleteArticleId,
  fetchData,
} from '../services/database';
import TimeAgo from '../services/TimeAgo';

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
  const [savedIds, setSavedIds] = useState([]);
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
    updateSavedIds();
  }, []);

  const updateSavedIds = () => {
    fetchData(ids => {
      setSavedIds(ids);
    });
  };

  const handleSaveId = () => {
    const articleIdToSave = '678776';
    insertArticleId(articleIdToSave);
    updateSavedIds();
  };

  const handleDeleteId = () => {
    if (savedIds.length > 0) {
      const articleIdToDelete = savedIds[0];
      deleteArticleId(articleIdToDelete);
      updateSavedIds();
    }
  };

  const renderArticleItem = ({item}) => (
    <View style={styles.articleContainer}>
      <Image source={{uri: item.urlToImage}} style={styles.articleItemImage} />
      <View style={styles.articleDetailsContainer}>
        <Text style={styles.articleItemTitle}>{item.title}</Text>
        <View style={styles.authorBookmarkContainer}>
          <Text style={styles.articleItemAuthor}>
            {item.author == null ? item.source.name : item.author}
          </Text>
        </View>
        <View style={styles.authorBookmarkItemContainer}>
          <TimeAgo publishDate={item.publishDate} />
          <FontAwesomeIcon icon={faBookmark} style={styles.bookmarkIcon} />
        </View>
      </View>
    </View>
  );

  const renderFirstArticle = () => (
    <View>
      {articles.length > 0 && articles[0].urlToImage ? (
        <View>
          <Image
            source={{uri: articles[0].urlToImage}}
            style={styles.firstArticleImage}
          />
          <Text style={styles.firstArticleTitle}>{articles[0].title}</Text>
          <View style={styles.authorBookmarkContainer}>
            <Text style={styles.firstArticleAuthor}>{articles[0].author}</Text>
          </View>
          <View style={styles.authorBookmarkContainer}>
            <TimeAgo publishDate={articles[0].publishDate} />
            <FontAwesomeIcon icon={faBookmark} style={styles.bookmarkIcon} />
          </View>
        </View>
      ) : null}
    </View>
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

      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Save ID to Database" onPress={handleSaveId} />
      <Button
        title="Print Database Contents"
        onPress={() => console.log(savedIds)}
      />
      <Button title="Delete ID from Database" onPress={handleDeleteId} /> */}
    </View>
  );
}

export default HomeScreen;
