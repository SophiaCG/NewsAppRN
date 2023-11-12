import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import config from '../../config';
import {
  initDatabase,
  insertArticleId,
  deleteArticleId,
  fetchData,
} from '../services/database'; // Adjust the path based on your project structure

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
  const [savedIds, setSavedIds] = useState([]);

  const handlePress = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=tech&apiKey=${apiKey}`,
      );
      const data = await response.json();
      console.log(data); // Handle the API response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch and update the saved IDs when the component mounts
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Fetch News" onPress={handlePress} />
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
