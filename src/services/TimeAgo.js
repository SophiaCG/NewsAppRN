import React from 'react';
import {Text} from 'react-native';
import moment from 'moment';
import styles from '../styles';

function TimeAgo({publishDate}) {
  const [timeAgo, setTimeAgo] = React.useState('');

  React.useEffect(() => {
    const calculateTimeAgo = () => {
      const now = moment();
      const publishedAt = moment(publishDate);

      const diffInMilliseconds = now.diff(publishedAt);
      const duration = moment.duration(diffInMilliseconds);

      const years = duration.years();
      const months = duration.months();
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();

      let timeAgoString = '';

      if (years > 0) {
        timeAgoString = `${years} ${years === 1 ? 'year' : 'years'} ago`;
      } else if (months > 0) {
        timeAgoString = `${months} ${months === 1 ? 'month' : 'months'} ago`;
      } else if (days > 0) {
        timeAgoString = `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else if (hours > 0) {
        timeAgoString = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        timeAgoString = `${minutes} ${
          minutes === 1 ? 'minute' : 'minutes'
        } ago`;
      } else {
        timeAgoString = 'Just now';
      }

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();
  }, [publishDate]);

  return <Text style={styles.timeAgoText}>{timeAgo}</Text>;
}

export default function App() {
  const publishDate = '2023-11-10T21:52:00Z';

  return <TimeAgo publishDate={publishDate} />;
}
