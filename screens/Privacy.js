import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Privacy extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Privacy Policy"
      }
  };

  render() {
  	return (
  		<ScrollView contentContainerStyle={styles.container}>
  			<Text>This is privacy page</Text>
  		</ScrollView>
  	);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16
  }
});
