import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Issue from './screens/Issue';
import Dashboard from './screens/Dashboard';
import Trends from './screens/Trends';
import Profile from './screens/Profile';
import Terms from './screens/Terms';
import Privacy from './screens/Privacy';
import About from './screens/About';

const stackNavigatorConfigs = {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#f76054"
        },
        headerTintColor: "#FFF"
    },
    cardStyle: {
        backgroundColor: "transparent"
    }
}

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Issue: { screen: Issue },
  Dashboard: { screen: Dashboard },
  Trends: { screen: Trends },
  Profile: { screen: Profile },
  Terms: { screen: Terms },
  Privacy: { screen: Privacy },
  About: { screen: About }
}, stackNavigatorConfigs);

export default AppNavigator;