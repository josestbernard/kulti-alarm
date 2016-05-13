// TODO: Create a view for settings
settings = {
  days = {},
  enabled = true,
  language = 'DE',
  learn_type = ['KNOWN_WORDS', 'NEW_WORDS']
}


import React, {
  AppRegistry,
  Component,
  Text,
  View,
  DatePickerIOS,
  TouchableHighlight
} from 'react-native';
import Sound from 'react-native-sound';
import PushNotification from 'react-native-push-notification';
import Styles from './AppStyles'
import Logger from '../../utils/KultiTrack';

const TEST_URL = 'http://date.jsontest.com/';
const DEFAULT_LANGUAGE = 'en';
const duolingo = {
  USER_SETTINGS_URL: 'https://duolingo.com/api/1/users/show?username=josebernard',
  TRANSLATE_URL: 'https://d2.duolingo.com/api/1/dictionary/hints/de/es'

}
const logger = Logger('Main App');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        logger.debug( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        logger.debug( 'NOTIFICATION:', notification );
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * IOS ONLY: (optional) default: true
      * - Specified if permissions will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
function bridge() {
  getTestAsync()
  return 'Noob'
}
function sortByLearntDate(skill1, skill2){
  return skill2.learned_ts - skill1.learned_ts
}
function filterOnlyLearned(skill){
  return skill.learned === true;
}
function filterCurrentlyLearning(language){
  return language.current_learning === true;
}

class KultiAlarm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'NO_TITLE',
      words: [],
      words_translated: [],
      snooze_count: 0,
      loaded: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }
  componentDidMount() {

    //this.getAlarmData();
    //this.playAlarm();
    PushNotification.localNotificationSchedule({
    message: "My Notification Message", // (required)
    date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    });
  }

  onDateChange (date) {
    logger.debug("SOMETHING HAS CHANGED", date)
  }
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.welcome}>
          {this.state.title}
        </Text>
        <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
        <DatePickerIOS style = {Styles.picker}
            date={new Date()}
            mode="time"
            timeZoneOffsetInMinutes={0}
            onDateChange={this.onDateChange}
          />
          <TouchableHighlight
            style={Styles.button}
            onPress={logger.debug('Button Clicked!')}>
            <View>
              <Text style={Styles.buttonText}>Button!</Text>
            </View>
          </TouchableHighlight>
      </View>

    );
  }
}



module.exports = KultiAlarm;
