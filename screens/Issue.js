import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, NativeModules, ToastAndroid, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { BASE_URL } from './constants.js';
import { Input, ButtonGroup, Button, Icon, Image, Overlay } from 'react-native-elements';
import GooglePlacesInput from './GooglePlacesInput';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const MARGIN = 16;
const MARGIN_MAIN = 24;

const URL = `${BASE_URL}/site/createIssue`

export default class Issue extends React.Component {
  static navigationOptions = {
    headerTitle: "Report an Issue"
  };

  state = {
    issueType: 0,
    notes: '',
    location: '',
    ImageSource: null,
    data: null,
    Image_TAG: 'new_img',
    token: null,
    overlay: false
  }

  componentDidMount() {
      this.getToken();
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      console.log("value", value);
      if(value) {
        this.setState({token: value});
      }
    } catch(e) {
      console.log("value", e);
    }
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          ImageSource: source,
          data: response.data
        });
      }
    });
  }

  onChange = (n, e) => {
    this.setState({
      [n]: e.nativeEvent.text
    })
  }

  validate = () => {
    this.error = "";
    if(this.state.ImageSource == "") {
      this.error = "Please upload an image"
    }
    else if(this.state.location == "") {
      this.error = "Please select a location"
    }

    if(this.error != "") {
      return false;
    } else {
      return true;
    }
  }

  createIssue = () => {
    if(this.validate()) {
      const url_main = `${URL}/?auth_token=${this.state.token}`;
      console.log("url_main", url_main);
      this.setState({overlay: true});
      RNFetchBlob.fetch('POST', url_main, {
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'image_tag', data: this.state.Image_TAG },
        { name : 'Issue', data : JSON.stringify({
            type : this.state.issueType,
            location : this.state.location,
            notes : this.state.notes
          })
        }
      ]).then((resp) => {
        console.log("asfasafasfa", resp);
        this.setState({overlay: false});
        ToastAndroid.show("Complaint registered successfully", ToastAndroid.LONG);
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      });

    } else if(this.error) {
      ToastAndroid.show(this.error, ToastAndroid.LONG);
    }
  }

  setLocation = (data) => {
    this.setState({location: data.description});
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <GooglePlacesInput setLocation={this.setLocation} location={this.state.location} />
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.issueType}
              prompt="Issue Classification"
              onValueChange={(itemValue, itemIndex) =>
                this.setState({issueType: itemValue})
              }>
              <Picker.Item label="Health" value="1" />
              <Picker.Item label="Housing" value="2" />
              <Picker.Item label="Security" value="3" />
              <Picker.Item label="Education" value="4" />
              <Picker.Item label="Infrastructural" value="5" />
              <Picker.Item label="Economic" value="6" />
              <Picker.Item label="Public Services" value="7" />
              <Picker.Item label="Racial/Cultural" value="8" />
              <Picker.Item label="Corruption" value="9" />
              <Picker.Item label="Police" value="10" />
            </Picker>
          </View>
          {!this.state.ImageSource ? 
            <TouchableOpacity onPress={this.selectPhotoTapped}>
              <View style={[styles.inputMain, styles.extraMain]}>
                <Icon
                  name='image'
                  type='font-awesome'
                  color='#BBB'
                  size={38}
                />
                <Text style={styles.add}>Add a photo</Text>
              </View>
            </TouchableOpacity> : null }
          {this.state.ImageSource ? 
            <TouchableOpacity onPress={this.selectPhotoTapped} style={{marginBottom: MARGIN}}>
              <Image source={this.state.ImageSource} style={{ height: 200, borderRadius: 8}} />
              <Text style={{justifyContent: 'flex-end', marginTop: 4}}>Tap to change</Text>
            </TouchableOpacity> : null }
          <Input placeholder='Add a note...' multiline={true} style={styles.input} inputContainerStyle={[styles.inputMain, styles.extraInput]} value={this.state.notes} onChange={this.onChange.bind(this, 'notes')} />
          <Button title="Submit" onPress={this.createIssue} containerStyle={styles.btn} />
        </ScrollView>
        <Overlay isVisible={this.state.overlay} width={150} height={150} containerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', padding: MARGIN}}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{marginTop: MARGIN}}>Submitting your complaint...</Text>
          </View>
        </Overlay>
      </KeyboardAvoidingView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: MARGIN,
    backgroundColor: "#FFF"
  },
  input: {
    marginBottom: MARGIN
  },
  inputMain: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: MARGIN
  },
  extraInput: {
    height: 100,
    padding: 12
  },
  extraMain: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add: {
    fontSize: 20,
    color: "#BBB",
    margin: 12
  },
  addHeader: {
    fontSize: 16,
    color: "#666",
    margin: 12
  },
  picker: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: MARGIN,
    marginTop: MARGIN
  },
  btn: {
    width: 150,
    alignSelf: 'center',
    marginTop: MARGIN,
    marginBottom: MARGIN
  }
});
