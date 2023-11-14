import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import BookmarkedScreen from './src/screens/BookmarkedScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from './src/styles';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#DB252E', // Set your desired background color
          },
          headerTintColor: '#fff', // Set your desired text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'News App',
            headerRight: () => (
              <TouchableOpacity
              onPress={() => navigation.navigate('Bookmarked')}>
              <FontAwesomeIcon
                icon={faBookmark}
                style={styles.bookmarkNavIcon}
              />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Bookmarked"
          component={BookmarkedScreen}
          options={{
            title: 'Bookmarked',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
