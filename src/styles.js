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
    marginTop: 10,
    width: 325,
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
    marginVertical: 5,
  },
  timeAgoText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#DB252E',
    alignItems: 'baseline',
  },
  bookmarkIcon: {
    color: 'gray',
  },
  articleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    width: '90%',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#C7C7C7',
    paddingTop: 15,
  },
  articleItemImage: {
    width: 100,
    height: 75,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  articleDetailsContainer: {
    width: 200,

    // borderWidth: 1,
    // borderColor: 'purple',
  },
  articleItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  authorBookmarkItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
  },
  articleItemAuthor: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
    marginTop: 3,
    marginBottom: 5,
    // alignItems: 'baseline',
  },
});

export default styles;
