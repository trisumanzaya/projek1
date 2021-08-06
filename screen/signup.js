import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import firebase from './config/FIREBASE'
import { database } from './config/FIREBASE'




class Signup extends Component {
    state = {
        email: '',
        password: '',
        nama: '',
        phone: ''
    }

    handleChangeTextemail = (e) => {
        // console.log(e)
        this.setState({
            email: e,
        })
    }
    handleChangeTextPasword = (e) => {
        // console.log(e)
        this.setState({
            password: e,
        })
    }

    handleChangeTextNama = (e) => {
        // console.log(e)
        this.setState({
            nama: e,
        })
    }
    handleChangeTextPhone = (e) => {
        // console.log(e)
        this.setState({
            phone: e,
        })
    }



    handleRegisterSubmit = () => {
        const { email, password, nama, phone } = this.state;
        console.log('data before send : ', email, password, nama, phone)


        firebase.auth().createUserWithEmailAndPassword(email, password, nama, phone)
        .then(res => {
            console.log('succes: ', res); 
            firebase.database().ref('users/'  + res.user.uid ).set({
                username: nama,
                email: email,
                phone: phone,
                role: 'user'
            }).then(() =>{
                Alert.alert("Sign in succes")
                this.props.navigation.navigate('Login')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                Alert.alert("gak masuk")
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            Alert.alert("Masukan email & pasword dengan benar")
        });

       


        
    }
    // const [email, Setemail] = useState();
    // const [password, SetPassword] = useState();

    // const AuthSign = async () => {
    //     try {
    //     const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB9YEIUhVO3SOWq1A4yo49KYFeBmU-oI4", {
    //         method: "POST",
    //         headers: {
    //             'Conten-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         })
    //     })
    //     const resData = await response.json()
    //     console.log(resData)
    // }catch (error){
    //     console.log(error)
    // }
    // }
    render() {
        return (
            <View style={styles.container} >
                <Image style={styles.img}
                    source={require('./image/WEKER.png')} />
                <Text style={styles.Logo}> REGISTER</Text>
                <View style={styles.inputView}>
                    <TextInput id="email" style={styles.inputText}
                        placeholder="email"
                        placeholderTextColor="#636e72"
                        onChangeText={this.handleChangeTextemail} />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        id="password"
                        style={styles.inputText}
                        placeholder="password"
                        placeholderTextColor="#636e72"
                        onChangeText={this.handleChangeTextPasword} />
                </View>
                <View style={styles.inputView}>
                    <TextInput id="email" style={styles.inputText}
                        placeholder="nama"
                        placeholderTextColor="#636e72"
                        onChangeText={this.handleChangeTextNama} />
                </View>
                <View style={styles.inputView}>
                    <TextInput id="email" style={styles.inputText}
                        placeholder="Phone number"
                        placeholderTextColor="#636e72"
                        onChangeText={this.handleChangeTextPhone} />
                </View>
                <TouchableOpacity style={styles.LoginBtn1} onPress={this.handleRegisterSubmit}>
                    <Text style={styles.LoginText} >Sign Up</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#74b9ff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    Logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#636e72',
        marginBottom: 40,
        color: 'white'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#dfe6e9",
        borderRadius: 25,
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    inputText: {
        height: 50,
        color: '#74b9ff'
    },
    LoginBtn: {
        width: '65%',
        backgroundColor: "#81ecec",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10

    },
    LoginBtn1: {
        width: '65%',
        backgroundColor: "#fff200",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30

    },
    LoginText: {
        color: '#636e72'
    },
    Forget: {
        color: 'white',
        fontSize: 11,
        marginTop: 10
    },
    img: {
        width: 100,
        height: 100,

    }
})

