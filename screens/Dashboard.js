import React from 'react';
import { BASE_URL } from './constants.js';
import { StyleSheet, View, ScrollView, Picker, ToastAndroid, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Card, CheckBox, Icon, Text, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { PieChart } from 'react-native-chart-kit';
import { StackActions, NavigationActions } from 'react-navigation';
import ViewMoreText from 'react-native-view-more-text';
import Drawer from './Drawer';
import Grid from 'react-native-grid-component';

const MY_URL = `${BASE_URL}/site/list`
const LOGOUT_URL = `${BASE_URL}/site/logout`
const FILTER_URL = `${BASE_URL}/site/listFilter`

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Home extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
      return {
        title: "Home",
        headerRight: (
          <View style={{flexDirection: 'row', marginRight: 24}}>
            <TouchableOpacity onPress={() => navigation.navigate('Trends')}>
                <Icon
                  name='bar-chart'
                  type='font-awesome'
                  size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 24}} onPress={() => navigation.navigate('Profile')}>
              <Icon
                name='user-circle'
                type='font-awesome'
                size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 24}} onPress={() => navigation.state.params.logout()}>
              <Icon
                name='power-off'
                type='font-awesome'
                size={18} />
            </TouchableOpacity>
          </View>
        )
      }
    };*/

    static navigationOptions = ({navigation}) => {
      return {
        header: null
      }
    }

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
      this.props.navigation.setParams({logout: this.logout})
  	}

    logout = () => {
      fetch(`${LOGOUT_URL}/?auth_token=${this.state.token}`)
      .then((r) => r.json())
      .then((response) => {
        this.removeToken();
      });
    }

    removeToken = async () => {
      try {
        await AsyncStorage.removeItem('token');
        const resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        });

        this.props.navigation.dispatch(resetAction);
      } catch(e) {
        // remove error
      }
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

    getIcon = (issue) => {
      const t = parseInt(issue.type);
      if(t == 1) {
        return "ambulance";
      } else if(t == 2) {
        return "home";
      } else if(t == 3) {
        return "eye";
      } else if(t == 4) {
        return "university";
      } else if(t == 5) {
        return "building";
      } else if(t == 6) {
        return "credit-card";
      } else if(t == 7) {
        return "users";
      } else if(t == 8) {
        return "user-times";
      } else if(t == 9) {
        return "thumbs-down";
      } else if(t == 10) {
        return "user-secret";
      } else {
        return "cog";
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

    renderViewMore = (onPress) => {
      return(
        <Text style={{color: "#2089dc", paddingLeft: 12}} onPress={onPress}>Read more</Text>
      )
    }


    renderViewLess = (onPress) => {
      return(
        <Text style={{color: "#2089dc", paddingLeft: 12}} onPress={onPress}>Read less</Text>
      )
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
              {this.renderNodeSingle(this.getIcon(issue), this.getName(issue))}
              {this.renderNodeSingle('map-marker', issue.location)}
              {this.renderNodeSingle('calendar', this.formatDate(issue.created_at))}
              { issue.notes ? this.renderNodeSingle('quote-left', issue.notes, false, true) : null }
            </View>
				  </Card>
  			)
  		});

      if(nodes.length == 0) {
        return (<View style={{marginTop: MARGIN_MAIN}}><Text style={{fontSize: 16}}>No complaints registered.</Text></View>);
      }

  		return nodes;
  	}

    renderNodeSingle = (icon, content, isBold=false, truncate=false) => {
      return (
        <View style={{marginBottom: 16, flexDirection: 'row', alignItems: truncate ? 'flex-start' : 'center'}}>
           <Icon
            name={icon}
            type='font-awesome'
            size={16} />
            {
              truncate ? (
                <ViewMoreText numberOfLines={3} renderViewMore={this.renderViewMore} renderViewLess={this.renderViewLess} textStyle={{fontSize: isBold ? 16 : 14, marginLeft: 12}}>
                  <Text>{content}</Text>
                </ViewMoreText>
              ) : (
                <Text style={{fontSize: isBold ? 16 : 14, marginLeft: 12}}>{content}</Text>
              )
            }
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

    isDiff = (n) => {
      return [0, 2, 5, 7, 8, 10].indexOf(n) >= 0;
    }

    renderType = (data, i) => {
      let bgcolor = this.isDiff(i) ? "#f76054" : "#fb5345";
      let textColor = this.state.issueType == data.value ? "gold" : "#FFF";
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          if(data.value == "-1") {
            this.reportIssue()
          } else {
            this.setState({issueType: data.value}, () => {
              this.fetchIssues()  
            })
          }
        }} key={i} style={{flex: 1, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: bgcolor }}>
          <View key={`view_${i}`} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon key={`icon_${i}`} type="font-awesome" name={data.icon} color={textColor} />
            <Text key={`text_${i}`} style={{color: textColor, fontSize: 12, marginTop: 8}}>{data.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    renderMain = () => {
      const complaintTypes = [
        { icon: "flag", name: "+ New", value: "-1"},
        { icon: "globe", name: "Any", value: ""},
        { icon: "ambulance", name: "Health", value: "1"},
        { icon: "home", name: "Housing", value: "2"},
        { icon: "eye", name: "Security", value: "3"},
        { icon: "university", name: "Education", value: "4"},
        { icon: "building", name: "Infrastructural", value: "5"},
        { icon: "credit-card", name: "Economic", value: "6"},
        { icon: "users", name: "Public Services", value: "7"},
        { icon: "user-times", name: "Racial/Cultural", value: "8"},
        { icon: "thumbs-down", name: "Corruption", value: "9"},
        { icon: "user-secret", name: "Police", value: "10"}
      ];

      if(!this.state.loaded) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      } else {
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Grid
              renderItem={this.renderType}
              data={complaintTypes}
              numColumns={4}
            />
            <View style={{padding: MARGIN}}>
              {this.renderIssues()}
            </View>
          </ScrollView>
        );
      }
    }

  	render() {
  		return (
        <Drawer title="Complaints" navigation={this.props.navigation} logout={this.logout} reportIssue={this.reportIssue}>
          {this.renderMain()}
        </Drawer>
      )
  	}
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
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
