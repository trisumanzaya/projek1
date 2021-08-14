import React, { Component } from 'react'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Firebase from "@react-native-firebase/app"


export class FirebaseMessaging extends Component {
  componentDidMount (){
      console.log('yoyoyo');
    var firebaseConfig = {
      apiKey: "AIzaSyAEcIewIvybkM-CUGIHHM6a3Mzod1J-cII",
      authDomain: "djbp-29661.firebaseapp.com",
      projectId: "djbp-29661",
      storageBucket: "djbp-29661.appspot.com",
      messagingSenderId: "41427760076",
      appId: "1:41427760076:web:fd8aa95e0b920c053ca369"
    };
    // Initialize Firebase
    if(!Firebase.apps.length){
      Firebase.initializeApp (firebaseConfig)
    }else{
      Firebase.app();
    }
    
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }
  render(){
      return null;
  }
}

export default FirebaseMessaging
