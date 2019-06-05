import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';

const stackNavigatorConfigs = {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#f4511e"
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    },
    cardStyle: {
        backgroundColor: "transparent"
    }
}

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
}, stackNavigatorConfigs);

export default AppNavigator;