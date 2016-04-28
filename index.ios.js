import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  TouchableHighlight
} from 'react-native';
var Sound = require('react-native-sound');

const TEST_URL = 'http://date.jsontest.com/';
const DEFAULT_LANGUAGE = 'en';
const duolingo = {
  USER_SETTINGS_URL: 'https://duolingo.com/api/1/users/show?username=josebernard',
  TRANSLATE_URL: 'https://d2.duolingo.com/api/1/dictionary/hints/de/es'

}


function dl(err, msg) {
  const prefix = '## KultiTrack ';
  console.log(prefix, err ? '[ERROR] ' + err : msg);
}
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
    super(props),
    this.state = {
      title: 'NO_TITLE',
      words: [],
      words_translated: [],
      snooze_count: 0,
      loaded: false
    };
  }
  componentDidMount() {
    this.getAlarmData();
    this.playAlarm();
  }
  playAlarm(){
    var whoosh = new Sound('alarm.aac', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      dl('failed to load the sound');
    } else { // loaded successfully
    dl(null, 'duration in seconds: ' + whoosh.getDuration() +
          'number of channels: ' + whoosh.getNumberOfChannels());
    whoosh.play((success) => {
      if (success) {
      dl(null, 'successfully finished playing');
      } else {
      dl('playback failed due to audio decoding errors');
      }
    });
    }
  });
  }
  getBrokenWords(){
    return this.state.words.join("\n");
  }
  agetAlarmData(){
    const skill = getTestAsync();
    dl(null, 'GOT ALARM DATA');
    dl(null, skill);
    this.setState({ words: skill.words, title:skill.title, loaded:true})
  }
  onDateChange (date) {
    dl(null, "SOMETHING HAS CHANGED")
  }

  buttonClicked(ev){

  }
  async getAlarmData() {
    try {
      const start = new Date().getTime();
      const JSON_HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'};
      dl(null, 'Loading...');
      const response = await fetch(duolingo.USER_SETTINGS_URL);
      const end = new Date().getTime();

      dl(null, `Finished after ${end-start} milliseconds`);

      const body = await response.json();
      const currentLearning = body.languages.filter(filterCurrentlyLearning)

      /*
      TODO: What if they're learning multiple languages at the same time? (set language per alarm?)
            What if they are not learning any language in Duolingo?
      */
      const learningTarget = currentLearning.length > 0 ? currentLearning[0].language : DEFAULT_LANGUAGE;
      const languageSkills = body.language_data[learningTarget].skills;
      const learnedSkills = languageSkills.filter(filterOnlyLearned).sort(sortByLearntDate);

      //TODO: Random skill? less practiced? harder by snoozes?

      data = learnedSkills[0];
      this.setState(
        {
          title: data.title,
          words: data.words,
          lang_known: data.ui_language,
          lang_learning: learningTarget.language,
          loadad: true
        }
      )
    } catch(error) {
      dl(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.title}
        </Text>
        <Text style={styles.instructions}>
          {this.getBrokenWords()}
        </Text>
        <DatePickerIOS style = {styles.picker}
            date={new Date()}
            mode="time"
            timeZoneOffsetInMinutes={0}
            onDateChange={this.onDateChange}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.buttonClicked.bind(this)}>
            <View>
              <Text style={styles.buttonText}>Button!</Text>
            </View>
          </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#252839'
  },
  button: {},
  buttonText: { fontSize:22, color: '#FFFFFF'},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#b5b5b7',
    margin: 10,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#b5b5b7',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f2b632'
  }
});

AppRegistry.registerComponent('KultiAlarm', () => KultiAlarm);
