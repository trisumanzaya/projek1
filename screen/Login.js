import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,Image,Alert, AsyncStorage} from 'react-native'
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
                console.log('succes: ', res);
                AsyncStorage.setItem('uid', userId)
                firebase.database().ref('/users/' + userId ).once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    console.log('user: ', user);
                    // const uuid = AsyncStorage.getItem('uuid')
                    if (user.role === 'admin') {
                        Alert.alert("Ini Admin")
                    this.props.navigation.navigate('Admin')
                    } else {
                        Alert.alert("semoga tugas anda cepat selesai")
                    this.props.navigation.navigate('User')
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
            <View style={styles.container} >
                <Image  style={styles.img}
          			source={require('./image/WEKER.png')}/>
                <Text style={styles.Logo}> DJBP WEKER</Text>
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
                
                <TouchableOpacity style={styles.LoginBtn} onPress={this.handleLoginSubmit}>
                    <Text style={styles.LoginText} >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.LoginBtn1} onPress={this.handleRegisterSubmit}>
                    <Text style={styles.LoginText} >Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    console.log('forget password')
                }}>
                    <Text style={styles.Forget} >forget password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Login;

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
        marginBottom: 20,
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
        marginTop:20
        
    },
    LoginBtn1: {
        width: '65%',
        backgroundColor: "#fff200",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
        
    },
    LoginText: {
        color: '#636e72'
    },
    Forget: {
        color: 'white',
        fontSize: 11,
        marginTop:20
    },
    img:{
        width:100,
        height:100,

    }
})

