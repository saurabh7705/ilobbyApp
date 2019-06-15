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
        title: "Trends"
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
      let zipcodeChartData = this.singlePieData(this.state.zipcode_issues);
      let maleChartData = this.singlePieData(this.state.male_issues);
      let femaleChartData = this.singlePieData(this.state.female_issues);
      this.setState({
        zipcodeChartData: zipcodeChartData,
        maleChartData: maleChartData,
        femaleChartData: femaleChartData,
      })
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
            name: this.getName(issue),
            count: 1
          });
        } else {
          let indexOfData = chartTypes.findIndex(i => i.type == issue.type);
          chartTypes[indexOfData].count++;
        }
      })
      chartData = chartTypes.map((i) => {
        return  { name: `- ${this.getName(i.type)}`, complaints: i.count, color: this.getRandomColor(), legendFontColor: '#444', legendFontSize: 15 }
      })

      return chartData;
    }

  	getName = (type) => {
  		const t = parseInt(type);
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
  			return "";
  		}
  	}

    renderChart = (data, heading) => {
      const chartConfig = {
        backgroundGradientFrom: '#FFF',
        backgroundGradientTo: '#FFF',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
      }
      return (
        <View style={{paddingTop: 16, paddingBottom: 16, backgroundColor: "#fafafa", marginBottom: 8, alignItems: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 18, marginBottom: 12, color: "#222"}}>{heading}</Text>
          <PieChart
              data={data}
              width={300}
              height={220}
              chartConfig={chartConfig}
              accessor="complaints"
              backgroundColor="transparent"
              paddingLeft="16"
              absolute={true}
            />
        </View>
      )
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
		    		{this.state.zipcodeChartData ? this.renderChart(this.state.zipcodeChartData, "Your zipcode") : null}
            {this.state.maleChartData ? this.renderChart(this.state.maleChartData, "Preferred by males") : null}
            {this.state.femaleChartData ? this.renderChart(this.state.femaleChartData, "Preferred by females") : null}
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
    backgroundColor: '#fff'
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
