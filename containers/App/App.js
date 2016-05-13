import React, {
  AppRegistry,
  Component,
  Text,
  View,
  DatePickerIOS,
  TouchableHighlight
} from 'react-native';
import Styles from './AppStyles'
import Logger from '../../utils/KultiTrack';
import DashBoard from '../../components/dashboard/Dashboard';

const DEFAULT_LANGUAGE = 'en';
const logger = Logger('Main App');


class KultiAlarm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={Styles.container}>
        <DashBoard/>
      </View>
    );
  }
}

module.exports = KultiAlarm;
