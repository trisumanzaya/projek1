/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from './screen/config/FIREBASE';

console.log(firebase);

AppRegistry.registerComponent(appName, () => App);
