import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login'
import Home from '../screen/Home'
import admin from '../screen/admin'
import adminUser from '../screen/adminUser'
import Signup from '../screen/signup'
import user from '../screen/user'

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Users" component={user} options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="Admin" component={admin} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Signup" component={Signup} options={{
                    headerShown: false
                }} />
                    <Stack.Screen name="User" component={adminUser} options={{
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
