import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class GooglePlacesInput extends React.Component {

  getDefaultValue = () => this.props.location;

  render(){
    return (
      <GooglePlacesAutocomplete
        placeholder='Enter location'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed={false}    // true/false/undefined
        fetchDetails={false}
        renderDescription={row => row.description} // custom description render
        onPress={(data) => { // 'details' is provided when fetchDetails = true
          this.props.setLocation(data);
        }}

        getDefaultValue={this.getDefaultValue}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyAnDVe8OFrJHhbs0sfDQ40HhgHOXEutfSo',
          language: 'en',
          types: '(cities)'
        }}

        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}

        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance'
        }}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    marginTop: 10
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    color: '#5d5d5d',
    fontSize: 16,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  }
});