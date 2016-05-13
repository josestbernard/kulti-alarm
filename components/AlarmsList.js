import React, { Switch, Component, TouchableHighlight, Text, View, ListView, AppRegistry } from 'react-native';
import AlarmsListStyles from './AlarmsListStyles'


class AlarmsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      alarmsListData: ds.cloneWithRows([
        { name: 'First Alarm', time: '09:00', language: 'DE' },
        { name: 'Second Alarm', time: '19:00', language: 'DE'},
        { name: 'Third Alarm', time: '19:00', language: 'DE'}
      ])
    }
  }
  render() {
    return (
      <View>
        <ListView
        dataSource={this.state.alarmsListData}
        renderRow={(rowData) => this._renderRow(rowData)}/>
      </View>
    );
  }
  /* eslint no-bitwise: 0 */
   hashCode(obj) {
    str = obj = obj.toString();
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
      hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
  }

  _pressRow(rowID) {
    return;
  }

  _renderRow(rowData) {
    var rowHash = Math.abs(this.hashCode(rowData));
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowHash)}>
        <View>
          <View style={AlarmsListStyles.row}>
            <Text style={AlarmsListStyles.time}>{rowData.time}</Text>
            <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.falseSwitchIsOn} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}
module.exports = AlarmsList;
