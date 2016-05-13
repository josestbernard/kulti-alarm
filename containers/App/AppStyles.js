import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
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

module.exports = Styles;
