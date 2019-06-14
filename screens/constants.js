import AsyncStorage from '@react-native-community/async-storage';

export const BASE_URL = "http://34.222.32.136/ilobby";

export function getToken = async () => {
	try {
	  const value = await AsyncStorage.getItem('token')
	  return value;
	} catch(e) {
	  return null;
	}
}