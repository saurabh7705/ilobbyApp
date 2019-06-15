import React from 'react';
import { BASE_URL } from './constants.js';
import { StyleSheet, View, ScrollView, Picker, ToastAndroid, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Card, CheckBox, Icon, Text, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { PieChart } from 'react-native-chart-kit';

const MY_URL = `${BASE_URL}/site/list`
const FILTER_URL = `${BASE_URL}/site/listFilter`

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: "Complaints",
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Trends')}>
            <View style={{color: "#222", backgroundColor: "#f5f5f5", borderRadius: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', height: 40, alignSelf: 'center', marginRight: 16}}>
              <Icon
                name='bar-chart'
                type='font-awesome'
                size={18} />
              <Text style={{marginLeft: 10, fontSize: 16}}>Trends</Text>
            </View>
          </TouchableOpacity>
        )
      }
    };

  	state = {
  		issues: [],
      zipcode_issues: [],
      male_issues: [],
      female_issues: [],
      location_issues: [],
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
            this.setState({loaded: true, issues: response.issues, zipcode_issues: response.zipcode_issues, male_issues: response.male_issues, female_issues: response.female_issues}, () => {
              this.setupPieData();
            });
          });
        }
      } catch(e) {
        console.log("after response ", e);
      }
    }

    setupPieData = () => {
      this.zipcodeChartData = this.singlePieData(this.state.zipcode_issues);
      this.maleChartData = this.singlePieData(this.state.male_issues);
      this.femaleChartData = this.singlePieData(this.state.female_issues);
    }

    getRandomColor = () => {
      return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }

    singlePieData = (issues) => {
      let chartTypesSingle = [];
      let chartTypes = [];
      issues.map((issue) => {
        if(chartTypesSingle.indexOf(issue.type) == -1) {
          chartTypes.push({
            type: issue.type,
            count: 1
          });
        } else {
          let indexOfData = chartTypes.findIndex(i => i.type == issue.type);
          chartTypes[indexOfData].count++;
        }
      })
      chartData = chartTypes.map((i) => {
        return  { name: this.getName(i.type), complaints: i.count, color: this.getRandomColor(), legendFontColor: '#7F7F7F', legendFontSize: 15 }
      })

      return chartData;
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
      let date = new Date(timestamp * 1000);
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
        const key = `issue_${issue.id}`;
  			return (
  				<Card key={key} containerStyle={{borderWidth: 1, borderColor: "#f1f1f1", borderRadius: 8, padding: 0, marginLeft: 0, marginRight: 0}}>
            <Image
              style={{height: 200, width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8}}
              resizeMode="cover"
              source={{ uri: issue.image_url }}
            />
            <View style={{paddingLeft: 16, paddingRight: 16, paddingTop: 16}}>
              {this.renderNodeSingle('cog', this.getName(issue))}
              {this.renderNodeSingle('map-marker', issue.location)}
              {this.renderNodeSingle('calendar', this.formatDate(issue.created_at))}
              { issue.notes ? this.renderNodeSingle('quote-left', issue.notes) : null }
            </View>
				  </Card>
  			)
  		});

      if(nodes.length == 0) {
        return (<View style={{marginTop: MARGIN_MAIN}}><Text style={{fontSize: 16}}>No complaints registered.</Text></View>);
      }

  		return nodes;
  	}

    renderNodeSingle = (icon, content, isBold=false) => {
      return (
        <View style={{marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
           <Icon
            name={icon}
            type='font-awesome'
            size={16} />
          <Text style={{fontSize: isBold ? 16 : 14, marginLeft: 12}}>{content}</Text>
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
            {/*
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
              </View> : null */}
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
    backgroundColor: "#FFF"
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
