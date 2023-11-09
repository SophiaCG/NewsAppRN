// HomeScreen.js
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import config from '../../config';

const apiKey = config.apiKey;

function HomeScreen({navigation}) {
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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Fetch News" onPress={handlePress} />
    </View>
  );
}

export default HomeScreen;
