import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { Input, ButtonGroup, Button, Icon, Image } from 'react-native-elements';
import GooglePlacesInput from './GooglePlacesInput';

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Issue extends React.Component {
  static navigationOptions = {
    headerTitle: "Report an Issue"
  };

  state = {
    issueType: 0,
    notes: '',
    bitmap: '',
    location: ''
  }

  onChange = (n, e) => {
    this.setState({
      [n]: e.nativeEvent.text
    })
  }

  _onPressCamera = () => {
    NativeModules.Activity.openCamera((bitmap) => {
      this.setState({bitmap: bitmap});
    }); 
  }

  setLocation = (data, details) => {
    console.log(data, details);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {!this.state.bitmap ? 
          <TouchableOpacity onPress={this._onPressCamera}>
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
        {this.state.bitmap ? 
          <TouchableOpacity onPress={this._onPressCamera}>
            <Image source={{ uri: this.state.bitmap }} style={{ height: 200 }} />
          </TouchableOpacity> : null }
        <View>
          <Text style={styles.addHeader}>Issue Classification</Text>
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
        </View>
        <GooglePlacesInput setLocation={this.setLocation} />
        <Input placeholder='Add a note...' multiline={true} style={styles.input} inputContainerStyle={[styles.inputMain, styles.extraInput]} value={this.state.notes} onChange={this.onChange.bind(this, 'notes')} />
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
  inputMain: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: MARGIN
  },
  extraInput: {
    height: 150,
    padding: 12
  },
  extraMain: {
    height: 200,
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
    marginLeft: 10,
    marginRight: 10
  }
});
