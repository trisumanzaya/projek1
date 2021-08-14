import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground, ScrollView, AsyncStorage, TextComponent } from 'react-native'

export default class InfoPekerjaanUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            kodeSatker: '',
            namaInstansi: '',
            uid: '',
            work: '',
            todolist: {},
            from_admin:false
        };
    }

    async componentDidMount() {
        await this.getUserInfo();
    }

    getUserInfo = async () => {
        let userId = await AsyncStorage.getItem('uid');
        console.log(userId);
        firebase.database().ref('/users/' + userId).once('value')
            .then((snapshot) => {
                const user = snapshot.val();
                console.log('user login: ', user);
                this.setState({
                    user: user.username,
                    email: user.email,
                    kodeSatker: user.kodeSatker,
                    todolist: user.todolist || {}
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                Alert.alert("Gagal")
            });

    }
    // UNSAFE_componentWillMount() {
    //     console.log('ini', this.props.route.params);
    //     // this.setState({ from_admin: this.props.route.params.from_admin })
    //     this.setState({ uid: this.props.route.params.uid })
    // }


    render() {
        return (
            <View style={styles.container} >

                <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
                    
                    <Text style={styles.txt}>{this.state.user}</Text>
                    <Text >{this.state.namaInstansi}</Text>
                    <Text >{this.state.kodeSatker}</Text>
                    <Text >{this.state.email}</Text>
                    <View style={styles.field}>
                        <ScrollView>
                        {Object.keys(this.state.todolist).map(key => {
                            return (
                                
                                <Text style={styles.txtbtn} >{this.state.todolist[key].detail}</Text> 
                                
                            )
                        })}

                        </ScrollView>
                    </View>
                </ImageBackground>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    gambar: {
        width: '100%',
        height: '100%',
        flex: 1,

    },
    txt: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#273c75',
        marginTop: 50,
        marginLeft: 10
    },
    field: {
        width: '80%',
        height: 200,
        marginLeft: 15,
        marginTop: 50
    }
})