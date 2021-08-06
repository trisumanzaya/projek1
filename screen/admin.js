import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class admin extends Component {

    state = {
        Allusers: {},
        email: '',
        user:'',
        phone:''
    }

    async componentDidMount() {
        await this.getAdminUserInfo();
        await this.getUsers();
    }

    getAdminUserInfo = async () => {
        const userId = await AsyncStorage.getItem('uid');
        console.log(userId);
        firebase.database().ref('/users/' + userId ).once('value')
        .then((snapshot) => {
            const user = snapshot.val();
            console.log('user login: ', user);
            this.setState({
                user: user.username,
                email: user.email,
                phone: user.phone
            })
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            Alert.alert("Gagal")
        });
    }

    getUsers = () => {
        firebase.database().ref('/users/').on('value', (snapshot) => {
            const users = snapshot.val();
            console.log('user login: ', users);
            this.setState({
                Allusers: users

            })
        });
    }
    
    handleUser = (uid) => {
        console.log('oiii');
        this.props.navigation.navigate('User', {uid, from_admin: true})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt1}>{this.state.user}</Text>
                <View style={styles.field}>
                    <View style={styles.vfield}>
                        <ScrollView>
                        {Object.keys(this.state.Allusers).map(key => {
                            return (
                                <TouchableOpacity style={styles.btn} 
                                onPress={() => this.handleUser(key)}> 
                                <Text style={styles.txtbtn} >{this.state.Allusers[key].username}</Text> 
                                </TouchableOpacity>
                            )
                        })}

                        </ScrollView>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#74b9ff",

    },
    txt1: {
        fontSize: 40,
        marginTop: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    txt2: {
        fontSize: 18,
        marginLeft: 25,
        color: 'white'
    },
    field: {
        backgroundColor: 'white',
        width: '90%',
        height: '60%',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 30,

    },
    vfield: {
        flex: 1,
        marginTop: 10,
        marginBottom:10,
        marginHorizontal:10
    },
    txtbtn: {
        fontSize: 35,
        marginHorizontal: 15,
        marginBottom:5,
        color: '#636e72'

    },
    txtfield1: {
        marginRight: 30
    },
    btn: {
        width: '90%',
        height:'15%',
        backgroundColor: "#fff200",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    }
})
