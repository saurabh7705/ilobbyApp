import React from 'react';
import { BASE_URL, getToken } from './constants.js';
import { StyleSheet, Text, View, ScrollView, Picker, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';

const MY_URL = `${BASE_URL}/site/list`
const FILTER_URL = `${BASE_URL}/site/listFilter`

const MARGIN = 16;
const MARGIN_MAIN = 24;

export default class Home extends React.Component {
	static navigationOptions = {
    	header: null
  	};

  	state = {
  		issues: [],
  		loaded: false
  	}

  	componentDidMount() {
  		const token = await this.getToken();
  		fetch(`${MY_URL}/?auth_token=${token}`).then((response) => {
  			this.setState({loaded: true, issues: response.issues});
	    });
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
  		this.props.navigation.navigate("Issue");
  	}

  	renderIssues = () => {
  		let nodes = null;

  		nodes = this.state.issues.map((issue) => {
  			return (
  				<Card
					title={this.getName(issue)}
				  	image={issue.image_url}
				  	>
				  	{
				  		issue.notes ? 
			  			<Text style={{marginBottom: 20, fontSize: 14}}>
			  				<Icon
							  name='quote-left'
							  type='font-awesome'
							  style={{marginRight: 12}} />
			  				{issue.notes}
			  			</Text>
				  		: null
				  	}
				  	<Text h4>
				  		<Icon
						  name='map-marker'
						  type='font-awesome'
						  style={{marginRight: 12}} />
				  		{issue.location}
				  	</Text>

				  	<Text style={{marginTop: 12, marginBottom: 12, fontSize: 12}}>
				  		<Icon
						  name='calender'
						  type='font-awesome'
						  style={{marginRight: 12}} />
				  		{issue.created_at}
				  	</Text>
				</Card>
  			)
  		});

  		return nodes;
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
		    		<View style={{justifyContent: 'flex-end', marginBottom: 12}}>
		    			<Text style={{fontSize: 12, color: "#222", backgroundColor: "#f5f5f5", borderRadius: 5, padding: 4}} onPress={this.reportIssue}>
					  		<Icon
							  name='flag'
							  type='font-awesome'
							  style={{marginRight: 12}} />
					  		Report an issue
					  	</Text>
		    		</View>
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
    alignItems: center
  },
  container: {
    backgroundColor: '#fff',
    padding: MARGIN_MAIN,
    backgroundColor: "#FFF",
    flex: 1
  }
});
