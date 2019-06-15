import React from 'react';
import { BASE_URL } from './constants.js';
import { StyleSheet, View, ScrollView, Picker, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, CheckBox, Icon, Text, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const MY_URL = `${BASE_URL}/site/list`
const FILTER_URL = `${BASE_URL}/site/listFilter`

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Home extends React.Component {
	static navigationOptions = {
    	headerTitle: "Complaints"
  	};

  	state = {
  		issues: [],
  		loaded: false,
      token: null,
      zipcode: false,
      male: true,
      female: true,
      issueType: ""
  	}

  	componentDidMount() {
  		this.getToken();
  	}

    getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        if(value) {
          this.setState({token: value});
          fetch(`${MY_URL}/?auth_token=${value}`)
          .then((r) => r.json())
          .then((response) => {
            this.setState({loaded: true, issues: response.issues});
          });
        }
      } catch(e) {
        console.log("after response ", e);
      }
    }

  	getName = (issue) => {
  		const t = parseInt(issue.type);
  		if(t == 1) {
  			return "Health";
  		} else if(t == 2) {
  			return "Housing";
  		} else if(t == 3) {
  			return "Security";
  		} else if(t == 4) {
  			return "Education";
  		} else if(t == 5) {
  			return "Infrastructural";
  		} else if(t == 6) {
  			return "Economic";
  		} else if(t == 7) {
  			return "Public Services";
  		} else if(t == 8) {
  			return "Racial/Cultural";
  		} else if(t == 9) {
  			return "Corruption";
  		} else if(t == 10) {
  			return "Police";
  		} else {
  			return issue.custom_name;
  		}
  	}

  	reportIssue = () => {
  		this.props.navigation.navigate("Issue", {
        onGoBack: this.refresh
      });
  	}

    refresh = () => {
      this.setState({
        issues: [],
        loaded: false,
        token: null,
        zipcode: false,
        male: true,
        female: true,
        issueType: ""
      });
      this.getToken();
    }

    fetchIssues = () => {
      this.setState({loaded: false});
      let filters = '';
      if(this.state.issueType != "") {
        filters = `&type=${this.state.issueType}`;
        if(this.state.zipcode) {
          filters = filters + `&zipcode=1`;
        }
        if(!this.state.male && this.state.female) {
          filters = filters + `&gender=1`; 
        }
        if(this.state.male && !this.state.female) {
          filters = filters + `&gender=0`; 
        }
      }
      fetch(`${FILTER_URL}/?auth_token=${this.state.token}${filters}`).then((r) => r.json()).then((response) => {
        this.setState({loaded: true, issues: response.issues});
      });
    }

    formatDate = (timestamp) => {
      let date = new Date(timestamp);
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

  	renderIssues = () => {
  		let nodes = null;

  		nodes = this.state.issues.map((issue) => {
        console.log("issue", issue);
        const key = `issue_${issue.id}`;
  			return (
  				<Card key={key} title={this.getName(issue)} containerStyle={{borderWidth: 1, borderColor: "#f1f1f1", borderRadius: 8}}>
            <Image
              style={{height: 200, width: '100%'}}
              resizeMode="cover"
              source={{ uri: issue.image_url }}
            />
            {this.renderNodeSingle('cog', issue.type) : null }
            {this.renderNodeSingle('map-marker', issue.location)}
            {this.renderNodeSingle('calendar', this.formatDate(issue.created_at))}
            { issue.notes ? this.renderNodeSingle('quote-left', issue.notes) : null }
				  </Card>
  			)
  		});

      if(nodes.length == 0) {
        return (<View style={{marginTop: MARGIN_MAIN}}><Text style={{fontSize: 16}}>No complaints registered.</Text></View>);
      }

  		return nodes;
  	}

    renderNodeSingle = (icon, content, isBold) => {
      return (
        <View style={{marginBottom: 16, flexDirection: 'row'}}>
           <Icon
            name={icon}
            type='font-awesome'
            size={16} />
          <Text style={{fontSize: isBold ? 16 : 12, marginLeft: 12}}>{content}</Text>
        </View>
      ) 
    }

    changeCheckbox = (stateType) => {
      const prev = this.state[stateType];
      this.setState({
        [stateType]: !prev
      }, () => {
        this.fetchIssues()
      })
    }

  	render() {
  		if(!this.state.loaded) {
	      return (
	        <View style={styles.loaderContainer}>
	          <ActivityIndicator size="large" color="#0000ff" />
	        </View>
	      )
	    } else {
	    	return (
		    	<ScrollView contentContainerStyle={styles.container}>
		    		<View style={{marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.picker}>
                <Picker
                  selectedValue={this.state.issueType}
                  prompt="Issue Classification"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({issueType: itemValue}, () => {
                      this.fetchIssues()  
                    })
                  }>
                  <Picker.Item label="All Complaints" value="" />
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
              <TouchableOpacity onPress={this.reportIssue}>
                <View style={{color: "#222", backgroundColor: "#f5f5f5", borderRadius: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', height: 50, alignSelf: 'center'}}>
                  <Icon
                    name='flag'
                    type='font-awesome'
                    size={18} />
    		    			<Text style={{marginLeft: 10, fontSize: 16}}>Report</Text>
                </View>
              </TouchableOpacity>
		    		</View>
            {
              this.state.issueType != "" ? 
              <View>
                <View style={{backgroundColor: "#f5f5f5", height: 1, marginBottom: 16, marginTop: 10, width: 100}}></View> 
                <View style={{marginBottom: 12, marginLeft: -8, flexDirection: 'row'}}>
                  <CheckBox
                    size={16}
                    title='My Zipcode'
                    checked={this.state.zipcode}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this.changeCheckbox('zipcode')}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkTxt}
                  />
                  <CheckBox
                    size={16}
                    title='Male'
                    checked={this.state.male}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this.changeCheckbox('male')}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkTxt}
                  />
                  <CheckBox
                    size={16}
                    title='Female'
                    checked={this.state.female}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this.changeCheckbox('female')}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkTxt}
                  />
                </View>
              </View> : null }
		    		{this.renderIssues()}
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
    backgroundColor: "#FFF",
    flex: 1
  },
  picker: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    width: 175
  },
  checkbox: {
    backgroundColor: "#FFF",
    padding: 0,
    margin: 0,
    borderWidth: 0,
    alignItems: 'center'
  },
  checkTxt: {
    fontWeight: 'normal',
    fontSize: 14
  }
});
