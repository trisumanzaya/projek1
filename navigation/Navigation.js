import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login'
import Home from '../screen/Home'
import admin from '../screen/admin'
import user from '../screen/user'
import Signup from '../screen/signup'

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Signup" component={Signup} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Admin" component={admin} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="User" component={user} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Home" component={Home} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigation;
