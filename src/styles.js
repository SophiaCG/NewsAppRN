import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstArticleImage: {
    width: 325,
    height: 225,
    borderRadius: 5,
  },
  firstArticleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  authorBookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 325,
  },
  firstArticleAuthor: {
    fontSize: 15,
    fontWeight: '500',
    color: 'gray',
    alignItems: 'baseline',
  },
  bookmarkIcon: {
    color: 'gray',
  },
});

export default styles;
