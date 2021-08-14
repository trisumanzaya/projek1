import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground,ScrollView } from 'react-native'
import firebase from './config/FIREBASE'
import { database } from './config/FIREBASE'




class Signup extends Component {
    state = {
        email: '',
        password: '',
        nama: '',
        kodeSatker: '',
        namaInstansi:''
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
    handleChangeTextKodeSatker = (e) => {
        // console.log(e)
        this.setState({
            kodeSatker: e,
        })
    }
    handleChangeTextInstansi = (e) => {
        // console.log(e)
        this.setState({
            namaInstansi: e,
        })
    }



    handleRegisterSubmit = () => {
        const { email, password, nama, kodeSatker,namaInstansi } = this.state;
        console.log('data before send : ', email, password, nama, kodeSatker,namaInstansi)


        firebase.auth().createUserWithEmailAndPassword(email, password, nama, kodeSatker,namaInstansi)
            .then(res => {
                console.log('succes: ', res);
                firebase.database().ref('users/' + res.user.uid).set({
                    username: nama,
                    email: email,
                    kodeSatker: kodeSatker,
                    namaInstansi: namaInstansi,
                    role: 'user'
                }).then(() => {
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

    render() {
        return (
            <View style={styles.container} >
                    
                <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
                
                    <Text style={styles.Logo}> DAFTAR</Text>
                    <Text style={styles.Logo}> WEKER</Text>
                    <Image style={styles.img}
                        source={require('./image/WEKER.png')} />
                    <View style={styles.inputView}>
                        <TextInput id="email" style={styles.inputText}
                            placeholder="Email SATKER"
                            placeholderTextColor="white"
                            onChangeText={this.handleChangeTextemail} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            secureTextEntry
                            id="password"
                            style={styles.inputText}
                            placeholder="password"
                            placeholderTextColor="white"
                            onChangeText={this.handleChangeTextPasword} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput id="email" style={styles.inputText}
                            placeholder="nama"
                            placeholderTextColor="white"
                            onChangeText={this.handleChangeTextNama} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput id="email" style={styles.inputText}
                            placeholder="KODE SATKER"
                            placeholderTextColor="white"
                            onChangeText={this.handleChangeTextKodeSatker} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput id="email" style={styles.inputText}
                            placeholder="NAMA INSTANSI"
                            placeholderTextColor="white"
                            onChangeText={this.handleChangeTextInstansi} 
                            />
                    </View>
                    <TouchableOpacity style={styles.LoginBtn1} onPress={this.handleRegisterSubmit}>
                        <Text style={styles.LoginText} >Sign Up</Text>
                    </TouchableOpacity>                            
                </ImageBackground>

            </View>
        )
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    gambar: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Logo: {
        fontWeight: 'bold',
        fontSize: 40,
        fontWeight:'bold',
        color: '#273c75'
    },
    inputView: {
        width: "70%",
        backgroundColor: "#273c75",
        height: 50,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    inputText: {
        height: 50,
        color: 'white'
    },
    LoginBtn1: {
        width: '30%',
        backgroundColor: "#e84118",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'

    },
    img: {
        width:200,
        height:130,

    }
})

