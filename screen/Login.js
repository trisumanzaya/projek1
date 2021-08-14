import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,Image,Alert, AsyncStorage, ImageBackground} from 'react-native'
import firebase from './config/FIREBASE'




class Login extends Component {
    state = {
        email: '',
        password: ''
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

    handleLoginSubmit = () => {
        const {email,password}=this.state;
        console.log('data before send : ', email,password)
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const userId = res.user.uid;
                console.log('succes: ', res.user.uid);
                AsyncStorage.setItem('uid', userId)
                firebase.database().ref('/users/' + userId ).once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    console.log('user: ', user);
                    if (user.role === 'admin') {
                        Alert.alert("Ini Admin")
                    this.props.navigation.navigate('Admin')
                    } else {
                        Alert.alert("semoga tugas anda cepat selesai")
                    this.props.navigation.navigate('UserHome')
                    }
                  });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                Alert.alert("Email & pasword salah")
            });
    }

    handleRegisterSubmit = () => {
        this.props.navigation.navigate('Signup')
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
            <View style={styles.container}  >
                <ImageBackground  source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
                    
                    <Text style={styles.Logo}>MASUK  WEKER</Text>
                <Image  style={styles.img}
          			source={require('./image/WEKER.png')}/>
                <View style={styles.inputView}>
                    <TextInput id="email" style={styles.inputText}
                        placeholder="email"
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
                <View style={styles.vbtnlogin}>
                <TouchableOpacity style={styles.LoginBtn} onPress={this.handleLoginSubmit}>
                    <Text style={styles.LoginText} >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.LoginBtn1} onPress={this.handleRegisterSubmit}>
                    <Text style={styles.LoginText} >Sign Up</Text>
                </TouchableOpacity>
                    
                </View>

                </ImageBackground>
            </View>
        )
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    gambar:{
        width:'100%',
        height:'100%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#273c75',
        marginBottom:10,
        marginLeft:50


        
    },
    inputView: {
        width: "80%",
        backgroundColor: "#273c75",
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    inputText: {
        height: 50,
        color: 'white'
    },
    LoginBtn: {
        width: '30%',
        backgroundColor: "#e84118",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10
        
    },
    LoginBtn1: {
        width: '30%',
        backgroundColor: "#e84118",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginText: {
        color: 'white'
    },
    vbtnlogin:{
        flexDirection:'row'
    },
    img:{
        width:200,
        height:150,

    }
})

