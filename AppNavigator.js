import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';

const stackNavigatorConfigs = {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#F5F5F5"
        },
        headerTintColor: "#FFF"
    },
    cardStyle: {
        backgroundColor: "transparent"
    }
}

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
}, stackNavigatorConfigs);

export default AppNavigator;