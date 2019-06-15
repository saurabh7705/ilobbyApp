import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Issue from './screens/Issue';
import Dashboard from './screens/Dashboard';
import Trends from './screens/Trends';

const stackNavigatorConfigs = {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#FFF"
        },
        headerTintColor: "#222"
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
}, stackNavigatorConfigs);

export default AppNavigator;