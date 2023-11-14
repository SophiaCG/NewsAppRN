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
import styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark as outlinedBookmark} from '@fortawesome/free-regular-svg-icons/faBookmark';
import {faBookmark as filledBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {
  initDatabase,
  insertArticleUrl,
  deleteArticleUrl,
  fetchData,
} from '../services/database';
import TimeAgo from '../services/TimeAgo';

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

  const openArticleUrl = url => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  const renderArticleItem = ({item}) => (
    <TouchableOpacity onPress={() => openArticleUrl(item.url)}>
      <View style={styles.articleContainer}>
        <Image
          source={{uri: item.urlToImage}}
          style={styles.articleItemImage}
        />
        <View style={styles.articleDetailsContainer}>
          <Text style={styles.articleItemTitle}>{item.title}</Text>
          <View style={styles.authorBookmarkContainer}>
            <Text style={styles.articleItemAuthor}>
              {item.author == null ? item.source.name : item.author}
            </Text>
          </View>
          <View style={styles.authorBookmarkItemContainer}>
            <TimeAgo publishDate={item.publishDate} />
            <TouchableOpacity onPress={() => handleBookmarkPress(item.url)}>
              <FontAwesomeIcon
                icon={
                  isArticleSaved(item.url) ? filledBookmark : outlinedBookmark
                }
                style={[
                  styles.bookmarkIcon,
                  {color: isArticleSaved(item.url) ? '#DB252E' : 'gray'},
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFirstArticle = () => (
    <TouchableOpacity onPress={() => openArticleUrl(articles[0].url)}>
      <View>
        {articles.length > 0 && articles[0].urlToImage ? (
          <View>
            <Image
              source={{uri: articles[0].urlToImage}}
              style={styles.firstArticleImage}
            />
            <Text style={styles.firstArticleTitle}>{articles[0].title}</Text>
            <View style={styles.authorBookmarkContainer}>
              <Text style={styles.firstArticleAuthor}>
                {articles[0].author}
              </Text>
            </View>
            <View style={styles.authorBookmarkContainer}>
              <TimeAgo publishDate={articles[0].publishDate} />
              <TouchableOpacity
                onPress={() => handleBookmarkPress(articles[0].url)}>
                <FontAwesomeIcon
                  icon={
                    isArticleSaved(articles[0].url)
                      ? filledBookmark
                      : outlinedBookmark
                  }
                  style={[
                    styles.bookmarkIcon,
                    {
                      color: isArticleSaved(articles[0].url)
                        ? '#DB252E'
                        : 'gray',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
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
