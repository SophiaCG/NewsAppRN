import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import TimeAgo from './TimeAgo';
import BookmarkButton from './BookmarkButton';
import styles from '../styles';

const ArticleItem = ({article, isSaved, onPressBookmark}) => (
  <TouchableOpacity
    onPress={() =>
      Linking.openURL(article.url).catch(err =>
        console.error('Error opening URL:', err),
      )
    }>
    <Text>{onPressBookmark}</Text>
    <View style={styles.articleContainer}>
      <Image
        source={{uri: article.urlToImage}}
        style={styles.articleItemImage}
      />
      <View style={styles.articleDetailsContainer}>
        <Text style={styles.articleItemTitle}>{article.title}</Text>
        <View style={styles.authorBookmarkContainer}>
          <Text style={styles.articleItemAuthor}>
            {article.author == null ? article.source.name : article.author}
          </Text>
        </View>
        <View style={styles.authorBookmarkItemContainer}>
          <TimeAgo publishDate={article.publishDate} />
          <BookmarkButton
            isSaved={isSaved}
            onPress={() => onPressBookmark(article.url)}
          />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default ArticleItem;
