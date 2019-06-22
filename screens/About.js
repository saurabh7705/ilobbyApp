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
  			<Text>
          “kOMMUNITY” is envisioned as a platform for citizens to seek effective resolution of “kitchen table” issues and to act as a tool to facilitate bottoms up and more inclusive policy development by crowd-sourcing region specific local issues. This app will help you to make educated electoral decision by creating an innovative grade sheet for electoral candidates by recording how candidates have represented your local needs . It will also allow you to form community interest groups by facilitating engagement between users facing similar issues at a particular geographical locations and harness the power of "collective representation".
        </Text>
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
