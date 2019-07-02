import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, ToastAndroid, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Input, ButtonGroup, Button, Image, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './constants.js';
import { StackActions, NavigationActions } from 'react-navigation';
import TopSnackBar from 'react-native-top-snackbar';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

var img = require('./w.png');

const MARGIN = 16;
const MARGIN_MAIN = 24;

const LOGIN_URL = `${BASE_URL}/session/login`
const REGISTER_URL = `${BASE_URL}/session/create`
const ME_URL = `${BASE_URL}/site/me`

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    initialCall: false,
    loginType: 0,
    email: '',
    password: '',
    name: '',
    age: '',
    address: '',
    zipcode: '',
    gender: 0,
    education_level: 1,
    ethnicity: 1,
    simple: false
  }

  /*state = {
    initialCall: false,
    loginType: 1,
    email: 'saurabh@gmail.co',
    password: '112233',
    name: 'sasa',
    age: '23',
    address: 'asasas',
    zipcode: '123456',
    gender: 0,
    education_level: 1,
    ethnicity: 1
  }*/

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '951779765729-h3vj1ndm9fksncud2bp01n7bsi7b9kc1.apps.googleusercontent.com',
      offlineAccess: false
    })
    this.getToken();
  }

  googleLogIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      this.setState({email: user.email, password: user.id});
      fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.id,
        }),
      }).then((response) => response.json()).then((responseData) => {
        if(responseData.status == "ERROR") {
          this.setState({loginType: 2, simple: false});
        } else {
          this.afterResponse(responseData);
        }
      })

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.showSnack("You need to have Google Play Services app installed on your phone.", true);
      } else {
        this.showSnack("You need to have Google Play Services app installed on your phone.", true);
      }
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({loginType: selectedIndex})
  }

  updateGender = (selectedIndex) => {
    this.setState({gender: selectedIndex})
  }

  validate = (for_register) => {
    this.error = "";
    if(this.state.email == "") {
      this.error = "Please enter email"
    }
    else if(this.state.password == "") {
      this.error = "Please enter password"
    }
    else {
      if(for_register) {
        if(this.state.name == "") {
          this.error = "Please enter name"
        } else if (this.state.age == "") {
          this.error = "Please enter age"
        } else if (this.state.address == "") {
          this.error = "Please enter address"
        } else if (this.state.zipcode == "") {
          this.error = "Please enter zipcode"
        }
      }
    }

    if(this.error != "") {
      return false;
    } else {
      return true;
    }
  }

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      this.gotoDashboard();
    } catch (e) {
      //
    }
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value) {
        fetch(`${ME_URL}/?auth_token=${value}`).then((r) => r.json()).then((response) => {
          if(response.status == "AUTH_ERROR") {
            this.setState({initialCall: true});
          } else {
            //this.setState({initialCall: true});
            setTimeout(this.gotoDashboard, 3000);
          }
        })
      } else {
        this.setState({initialCall: true});
      }
    } catch(e) {
    }
  }

  gotoDashboard = () => {
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  register = () => {
    if(this.validate(true)) {

      fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "User": {
            email: this.state.email,
            password: this.state.password,
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

  login = () => { 
    if(this.validate()) { 

       fetch(LOGIN_URL, { 
        method: 'POST', 
        headers: {  
          Accept: 'application/json', 
          'Content-Type': 'application/json', 
        },  
        body: JSON.stringify({  
          email: this.state.email,  
          password: this.state.password,  
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
      this.showSnack(Array.isArray(response.message) ? response.message[0] : response.message, true);
    } else {
      this.storeToken(response.auth_token);
    }
  }

  showSnack = (msg, error=false) => {
    TopSnackBar.show({
      message: msg,
      duration: TopSnackBar.LONG,
      textColor: '#ffffff',
      backgroundColor: error ? '#D8493B' : "#08BD80"
    });
  }

  onChange = (n, e) => {
    this.setState({
      [n]: e.nativeEvent.text
    })
  }

  simpleLogin = () => {
    this.setState({loginType: 1, simple: false})
  }

  simpleSignup = () => {
    this.setState({loginType: 2, simple: true})
  }

  render() {
    const buttons = ['Login', 'Signup']
    const iconStyle = {
      type: 'font-awesome', color: "#aaa", size: 18, containerStyle: {
        marginRight: 12
      }
    };

    if(!this.state.initialCall) {
      return (
        <View style={styles.loaderContainer}>
          <Image
            source={img}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )
    } else {
      return (
        <ScrollView 
          keyboardShouldPersistTaps="always"
          contentContainerStyle={[styles.container, this.state.loginType != 0 ? styles.whiteBack : {} ]}>
          {this.state.email == "" && this.state.loginType == 0 ? (
            <View style={{height: Dimensions.get('window').height, alignItems: 'center', padding: 64}}>
              <Image
                source={img}
                style={{ width: 200, height: 200 }}
              />
              <TouchableOpacity onPress={this.googleLogIn}>
                <View style={{color: "#222", backgroundColor: "rgba(239,44,31, 0.05)", borderColor: "#f76054", borderWidth: 1, borderRadius: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', height: 50, alignSelf: 'center', marginTop: 32}}>
                  <Icon
                    name='google'
                    type='font-awesome'
                    color="#f76054"
                    size={18} />
                  <Text style={{marginLeft: 10, fontSize: 16, color: "#f76054"}}>Sign in with Google</Text>
                </View>
              </TouchableOpacity>
              <View style={{marginTop: 32, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.simpleLogin}>
                  <View style={{color: "#222", backgroundColor: "rgba(136, 56, 50, 0.05)", borderColor: "#883832", borderWidth: 1, borderRadius: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', height: 50, alignSelf: 'center', marginRight: 8}}>
                    <Text style={{fontSize: 16, color: "#883832"}}>Sign in</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.simpleSignup}>
                  <View style={{color: "#222", backgroundColor: "rgba(136, 56, 50, 0.05)", borderColor: "#883832", borderWidth: 1, borderRadius: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', height: 50, alignSelf: 'center', marginLeft: 8}}>
                    <Text style={{fontSize: 16, color: "#883832"}}>Sign up</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null }
          {this.state.loginType == 1 ?  
            <View style={{alignItems: 'center'}}>
              <Image
                  source={img}
                  style={{ width: 100, height: 100, marginBottom: MARGIN }}
                />  
              <Input placeholder='Email' leftIcon={{ ...iconStyle, name: 'envelope' }} keyboardType="email-address" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.email} onChange={this.onChange.bind(this, 'email')} />  
              <Input placeholder='Password' secureTextEntry={true} leftIcon={{ ...iconStyle, name: 'key' }} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.password} onChange={this.onChange.bind(this, 'password')} />  
              <Button title="Submit" onPress={this.login} containerStyle={styles.btn} buttonStyle={styles.buttonStyle} />  
            </View> 
            : null }
          {this.state.loginType == 2 ? 
              <View style={{alignItems: 'center'}}>
                <Image
                  source={img}
                  style={{ width: 100, height: 100, marginBottom: MARGIN }}
                />
                { !this.state.simple && this.state.email ? <Input placeholder='Email' leftIcon={{ ...iconStyle, name: 'envelope' }} keyboardType="email-address" inputStyle={styles.inputStyle} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.email} onChange={this.onChange.bind(this, 'email')} disabled /> : null }
                { this.state.simple ? <Input placeholder='Email' leftIcon={{ ...iconStyle, name: 'envelope' }} keyboardType="email-address" inputStyle={styles.inputStyle} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.email} onChange={this.onChange.bind(this, 'email')} /> : null }
                { this.state.simple ? <Input placeholder='Password' secureTextEntry={true} leftIcon={{ ...iconStyle, name: 'key' }} keyboardType="email-address" inputStyle={styles.inputStyle} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.password} onChange={this.onChange.bind(this, 'password')} /> : null }
                <Input placeholder='Name' leftIcon={{ ...iconStyle, name: 'user' }} style={styles.input} inputStyle={styles.inputStyle} inputContainerStyle={styles.inputMain} value={this.state.name} onChange={this.onChange.bind(this, 'name')} />
                <Input placeholder='Age' leftIcon={{ ...iconStyle, name: 'user-plus' }} keyboardType="numeric" inputStyle={styles.inputStyle} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.age} onChange={this.onChange.bind(this, 'age')} />
                <ButtonGroup
                  onPress={this.updateGender}
                  selectedIndex={this.state.gender}
                  buttons={['Male', 'Female']}
                  selectedButtonStyle={{backgroundColor: "#f76054", borderColor: "#f76054"}}
                  selectedTextStyle={{color: "#FFF"}}
                  containerStyle={{marginBottom: 20}}
                />
                <Input placeholder='Address' leftIcon={{ ...iconStyle, name: 'map-marker' }} inputStyle={styles.inputStyle} style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.address} onChange={this.onChange.bind(this, 'address')} />
                <Input placeholder='Zipcode' leftIcon={{ ...iconStyle, name: 'location-arrow' }} inputStyle={styles.inputStyle} keyboardType="numeric" style={styles.input} inputContainerStyle={styles.inputMain} value={this.state.zipcode} onChange={this.onChange.bind(this, 'zipcode')} />
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
                <Button title="Submit" onPress={this.register} containerStyle={styles.btn} buttonStyle={styles.buttonStyle} />
              </View>
             : null }
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(239,44,31, 0.2)"
  },
  container: {
    backgroundColor: "rgba(239,44,31, 0.2)",
    padding: MARGIN_MAIN
  },
  input: {
    marginBottom: MARGIN
  },
  btn: {
    width: 150,
    alignSelf: 'center',
    margin: MARGIN_MAIN
  },
  buttonStyle: {
    backgroundColor: "#f76054",
    borderColor: "#f76054"
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
    marginRight: 10,
    width: "95%"
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
  },
  inputStyle: {
    color: "#222"
  },
  whiteBack: {
    backgroundColor: "rgba(239,44,31, 0.01)"
  }
});
