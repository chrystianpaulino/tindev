/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App'; Colocou dentro de src a classe pricnipal
import App from './src';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
