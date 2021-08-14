import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login'
import Home from '../screen/Home'
import admin from '../screen/admin'
import adminUser from '../screen/adminUser'
import Signup from '../screen/signup'
import user from '../screen/user'
import adminBerita from '../screen/adminBerita'
import userHome from '../screen/userHome'
import LayananBerita from '../screen/LayananBerita'
import InfoPekerja from '../screen/InfoPekerja'
import LayananKonsultasi from '../screen/LayananKonsultasi'
import InfoPekerjaanUser from '../screen/infoPekerjaanUser'

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Admin" component={admin} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Home" component={Home} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="adminUser" component={adminUser} options={{
                    headerShown: false
                }} />
                    <Stack.Screen name="LayananBerita" component={LayananBerita} options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="UserHome" component={userHome} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="InfoPekerja" component={InfoPekerja} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="InfoPekerjaanUser" component={InfoPekerjaanUser} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="LayananKonsultasi" component={LayananKonsultasi} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="AdminBerita" component={adminBerita} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Signup" component={Signup} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="User" component={user} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigation;
