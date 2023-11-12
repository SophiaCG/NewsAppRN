import React, {useState, useEffect} from 'react';
import {Button, View, Text, Image} from 'react-native';
import config from '../../config';
import styles from '../styles'; // Adjust the path based on your project structure
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-regular-svg-icons/faBookmark';
import {
  initDatabase,
  insertArticleId,
  deleteArticleId,
  fetchData,
} from '../services/database'; // Adjust the path based on your project structure

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
  const [savedIds, setSavedIds] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=tech&apiKey=${apiKey}`,
      );
      const data = await response.json();

      // Check if articles are present in the response
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
        // console.log(articles[0].urlToImage);
      }

      // Handle other parts of the API response as needed
      console.log(data.articles[0].title);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch and update the saved IDs when the component mounts
    fetchNews();
    initDatabase();
    updateSavedIds(); // You may uncomment this if needed
  }, []);

  const updateSavedIds = () => {
    fetchData(ids => {
      setSavedIds(ids);
    });
  };

  const handleSaveId = () => {
    // Simulating an article ID, you would replace this with the actual ID from your API response
    const articleIdToSave = '678776';

    insertArticleId(articleIdToSave);
    updateSavedIds(); // Update the displayed list of saved IDs
  };

  const handleDeleteId = () => {
    // Simulating the deletion of the first saved ID, you may replace this logic as needed
    if (savedIds.length > 0) {
      const articleIdToDelete = savedIds[0];
      deleteArticleId(articleIdToDelete);
      updateSavedIds(); // Update the displayed list of saved IDs
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {articles.length > 0 && articles[0].urlToImage ? (
        <Image
          source={{uri: articles[0].urlToImage}}
          style={styles.firstArticleImage}
        />
      ) : null}
      {articles.length > 0 ? (
        <Text style={styles.firstArticleTitle}>{articles[0].title}</Text>
      ) : null}

      <View style={styles.authorBookmarkContainer}>
        {articles.length > 0 ? (
          <Text style={styles.firstArticleAuthor}>{articles[0].author}</Text>
        ) : null}
        <FontAwesomeIcon icon={faBookmark} style={styles.bookmarkIcon} />
      </View>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Save ID to Database" onPress={handleSaveId} />
      <Button
        title="Print Database Contents"
        onPress={() => console.log(savedIds)}
      />
      <Button title="Delete ID from Database" onPress={handleDeleteId} />
    </View>
  );
}

export default HomeScreen;
