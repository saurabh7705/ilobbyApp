import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, ToastAndroid, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Input, ButtonGroup, Button, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './constants.js';
import { StackActions, NavigationActions } from 'react-navigation';
import TopSnackBar from 'react-native-top-snackbar';

var img = require('./w.png');

const MARGIN = 16;
const MARGIN_MAIN = 24;

const UPDATE_URL = `${BASE_URL}/site/update`
const ME_URL = `${BASE_URL}/site/me`

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Edit Profile"
      }
  };

  state = {
    initialCall: false,
    token: '',
    name: '',
    age: '',
    address: '',
    zipcode: '',
    gender: 0,
    education_level: 1,
    ethnicity: 1
  }

  componentDidMount() {
    this.getToken();
  }

  updateGender = (selectedIndex) => {
    this.setState({gender: selectedIndex})
  }

  validate = () => {
    this.error = "";
    if(this.state.email == "") {
      this.error = "Please enter email"
    }
    else if(this.state.name == "") {
      this.error = "Please enter name"
    } else if (this.state.age == "") {
      this.error = "Please enter age"
    } else if (this.state.address == "") {
      this.error = "Please enter address"
    } else if (this.state.zipcode == "") {
      this.error = "Please enter zipcode"
    }

    if(this.error != "") {
      return false;
    } else {
      return true;
    }
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value) {
        fetch(`${ME_URL}/?auth_token=${value}`).then((r) => r.json()).then((response) => {
          this.setState({
            initialCall: true,
            token: value,
            name: response.name,
            age: response.age,
            address: response.address,
            zipcode: response.zipcode,
            ethnicity: response.ethnicity,
            education_level: response.education_level,
            sex: response.gender
          })
        })
      }
    } catch(e) {
    }
  }

  register = () => {
    if(this.validate(true)) {

      fetch(`${UPDATE_URL}/?auth_token=${this.state.token}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "User": {
            name: this.state.name,
            age: this.state.age,
            address: this.state.address,
            zipcode: this.state.zipcode,
            ethnicity: this.state.ethnicity,
            education_level: this.state.education_level,
            sex: this.state.gender
          }
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.afterResponse(responseData);
      })
      
    } else if(this.error) {
      this.showSnack(this.error, true);
    }
  }

  afterResponse = (response) => {
    if(response.status == "ERROR") {
      this.showSnack(response.message[0], true);
    } else {
      this.showSnack("Profile updated successfully", false);
    }
  }

  onChange = (n, e) => {
    this.setState({
      [n]: e.nativeEvent.text
    })
  }

  showSnack = (msg, error=false) => {
    TopSnackBar.show({
      message: msg,
      duration: TopSnackBar.LONG,
      textColor: '#ffffff',
      backgroundColor: error ? '#D8493B' : "#08BD80"
    });
  }

  render() {
    const iconStyle = {
      type: 'font-awesome', color: "#BBB", size: 18, containerStyle: {
        marginRight: 12
      }
    };

    if(!this.state.initialCall) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" /> 
        </View>
      )
    } else {
      return (
        <ScrollView 
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.container}>
            <View>
              <Input placeholder='Name' leftIcon={{ ...iconStyle, name: 'user' }} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.name} onChange={this.onChange.bind(this, 'name')} />
              <Input placeholder='Age' leftIcon={{ ...iconStyle, name: 'user-plus' }} keyboardType="numeric" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.age} onChange={this.onChange.bind(this, 'age')} />
              <ButtonGroup
                onPress={this.updateGender}
                selectedIndex={this.state.gender}
                buttons={['Male', 'Female']}
                containerStyle={{marginBottom: 20}}
              />
              <Input placeholder='Address' leftIcon={{ ...iconStyle, name: 'map-marker' }} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.address} onChange={this.onChange.bind(this, 'address')} />
              <Input placeholder='Zipcode' leftIcon={{ ...iconStyle, name: 'location-arrow' }} keyboardType="numeric" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.zipcode} onChange={this.onChange.bind(this, 'zipcode')} />
              <View style={styles.picker}>
                <Picker
                  selectedValue={this.state.education_level}
                  prompt="Education Level"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({education_level: itemValue})
                  }>
                  <Picker.Item label="Doctorate & Higher" value="1" />
                  <Picker.Item label="Master's" value="2" />
                  <Picker.Item label="Bachelor's" value="3" />
                  <Picker.Item label="Associate" value="4" />
                  <Picker.Item label="High School" value="5" />
                  <Picker.Item label="Professional" value="6" />
                </Picker>
              </View>
              <View style={[styles.picker, {marginBottom: 0}]}>
                <Picker
                  selectedValue={this.state.ethnicity}
                  itemStyle={styles.picker}
                  prompt="Ethnicity"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ethnicity: itemValue})
                  }>
                  <Picker.Item label="American Indian" value="1" />
                  <Picker.Item label="Asian" value="2" />
                  <Picker.Item label="Black or African American" value="3" />
                  <Picker.Item label="Hispanic or Latino" value="4" />
                  <Picker.Item label="Native Hawaiian" value="5" />
                  <Picker.Item label="White" value="6" />
                </Picker>
              </View>
              <Button title="Submit" onPress={this.register} containerStyle={styles.btn} />
            </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff',
    padding: MARGIN_MAIN,
    backgroundColor: "#FFF"
  },
  input: {
    marginBottom: MARGIN
  },
  btn: {
    width: 150,
    alignSelf: 'center',
    margin: MARGIN_MAIN
  },
  inputMain: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: MARGIN
  },
  picker: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: MARGIN,
    marginLeft: 10,
    marginRight: 10
  },
  group: {
    borderWidth: 0,
    backgroundColor: "#FF000000"
  },
  selectedBtn: {
    backgroundColor: "#FF000000",
    borderBottomWidth: 3,
    borderColor: "#2089dc"
  },
  selectedTextStyle: {
    color: "#2089dc",
    fontSize: 18,
    fontWeight: 'bold'
  },
  textStyle: {
    color: "#AAA",
    fontSize: 18
  },
  innerBorderStyle: {
    width: 0
  }
});
