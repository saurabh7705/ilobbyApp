import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class About extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "About Us"
      }
  };

  render() {
  	return (
  		<ScrollView contentContainerStyle={styles.container}>
  			<Text>This is about us page</Text>
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
