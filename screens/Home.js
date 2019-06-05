import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Input, ButtonGroup, Button } from 'react-native-elements';

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loginType: 0,
    email: '',
    password: '',
    nam: '',
    age: '',
    address: '',
    zipcode: '',
    gender: 0,
    education_level: 1,
    ethnicity: 1
  }

  updateIndex = (selectedIndex) => {
    this.setState({loginType: selectedIndex})
  }

  updateGender = (selectedIndex) => {
    this.setState({gender: selectedIndex})
  }

  login = () => {

  }

  register = () => {

  }

  onChange = (name, e) => {
    this.setState({
      [name]: e.nativeEvent.text
    })
  }

  render() {
    const buttons = ['Login', 'Signup']
    const iconStyle = {
      type: 'font-awesome', color: "#BBB", size: 18, containerStyle: {
        marginRight: 12
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.loginType}
          buttons={buttons}
          buttonStyle={styles.group}
          containerStyle={{marginBottom: MARGIN_MAIN, borderWidth: 0, width: 220}}
          containerBorderRadius={0}
          selectedButtonStyle={styles.selectedBtn}
          textStyle={styles.textStyle}
          selectedTextStyle={styles.selectedTextStyle}
          innerBorderStyle={styles.innerBorderStyle}
        />
        {this.state.loginType == 0 ? 
          <View>
            <Input placeholder='Email' leftIcon={{ ...iconStyle, name: 'envelope' }} keyboardType="email-address" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.email} onChange={this.onChange.bind(this, 'email')} />
            <Input placeholder='Password' secureTextEntry={true} leftIcon={{ ...iconStyle, name: 'key' }} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.password} onChange={this.onChange.bind(this, 'password')} />
            <Button title="Submit" onPress={this.login} containerStyle={styles.btn} />
          </View>
          : null }

        {this.state.loginType == 1 ? 
          <View>
            <Input placeholder='Email' leftIcon={{ ...iconStyle, name: 'envelope' }} keyboardType="email-address" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.email} onChange={this.onChange.bind(this, 'email')} />
            <Input placeholder='Password' secureTextEntry={true} leftIcon={{ ...iconStyle, name: 'key' }} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.password} onChange={this.onChange.bind(this, 'password')} />
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
                <Picker.Item label="Graduate" value="1" />
                <Picker.Item label="Post-Graduate" value="2" />
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
          : null }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: MARGIN_MAIN,
    backgroundColor: "#FFF",
    flex: 1
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
