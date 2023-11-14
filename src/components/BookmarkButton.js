// components/BookmarkButton.js
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark as outlinedBookmark} from '@fortawesome/free-regular-svg-icons/faBookmark';
import {faBookmark as filledBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {Text} from 'react-native';

const BookmarkButton = ({isSaved, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesomeIcon
      icon={isSaved ? filledBookmark : outlinedBookmark}
      style={{color: isSaved ? '#DB252E' : 'gray'}}
    />
  </TouchableOpacity>
);

export default BookmarkButton;
