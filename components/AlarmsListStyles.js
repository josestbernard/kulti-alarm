import { StyleSheet } from 'react-native';

const AlarmsListStyle = StyleSheet.create({
  time: {
    textAlign: 'left',
    color: '#666666',
    fontSize: 35,
    marginBottom: 5,
    width: 100,
    flex: 1
  },
  row: {
    backgroundColor: '#333333',
    flexDirection: 'row'
  }
});
module.exports = AlarmsListStyle;
