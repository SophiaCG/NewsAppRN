import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import TimeAgo from './TimeAgo';
import BookmarkButton from './BookmarkButton';
import styles from '../styles';
const FirstArticle = ({article, isSaved, onPressBookmark}) => (
  <TouchableOpacity
    onPress={() =>
      Linking.openURL(article.url).catch(err =>
        console.error('Error opening URL:', err),
      )
    }>
    <View>
      {article ? (
        <View>
          <Image
            source={{uri: article.urlToImage}}
            style={styles.firstArticleImage}
          />
          <Text style={styles.firstArticleTitle}>{article.title}</Text>
          <View style={styles.authorBookmarkContainer}>
            <Text style={styles.firstArticleAuthor}>{article.author}</Text>
          </View>
          <View style={styles.authorBookmarkContainer}>
            <TimeAgo publishDate={article.publishDate} />
            <BookmarkButton
              isSaved={isSaved}
              onPress={() => onPressBookmark(article.url)}
            />
          </View>
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

export default FirstArticle;
