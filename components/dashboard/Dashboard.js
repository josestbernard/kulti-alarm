import React, {Component, View, ListView, TouchableHighlight, Text } from 'react-native'
import DashboardStyle from './DashboardStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
class DashBoard extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dashBoardItems: ds.cloneWithRows([
        { label: 'Alarms', icon: 'clock-o' },
        { label: 'Settings', icon: 'gear' },
        { label: 'Statistics', icon: 'tachometer' },
        { label: 'About', icon: 'info-circle' },
      ])
    }
  }
  render() {
    return (
      <View style={DashboardStyle.container}>
        <View>
          <ListView
          dataSource={this.state.dashBoardItems}
          renderRow={(rowData) => this._renderRow(rowData)}/>
      </View>
      </View>
    )
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
          <View style={DashboardStyle.row}>
            <Icon name={rowData.icon} size={30} color="#f2b632" />
            <Text style={DashboardStyle.text}>{rowData.label}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = DashBoard;
