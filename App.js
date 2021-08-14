import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FirebaseMessaging } from './component/FirebaseMessaging';
import Navigation from './navigation/Navigation'

const App = (porps) =>{
  return (
    <Navigation>
      <FirebaseMessaging/>
    </Navigation>
  );
};
export default App;