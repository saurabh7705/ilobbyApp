import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Terms extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Terms & Conditions"
      }
  };

  render() {
  	return (
  		<ScrollView contentContainerStyle={styles.container}>
  			<Text>This is TnC page</Text>
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
