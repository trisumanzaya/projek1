import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class admin extends Component {

    state = {
        Allusers: {},
        email: '',
        user:'',
        kodeSatker:''
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
                kodeSatker: user.kodeSatker
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
        console.log(uid);
        this.props.navigation.navigate('InfoPekerja', {uid, from_admin: true})
    }
    handleButonBerita=()=>{
        this.props.navigation.navigate('AdminBerita')
    }
    handleButonPesan=()=>{
        this.props.navigation.navigate('adminUser')
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
                <Text style={styles.txt1}>{this.state.user}</Text>
                <View style={styles.vbtn1}>
                    <TouchableOpacity style={styles.btn1} onPress={this.handleButonBerita}>
                        <Text style={styles.txtbtn1}>BERITA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn1} onPress={this.handleButonPesan}>
                        <Text style={styles.txtbtn1}>PESAN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.field}>
                <Text>list satker</Text>
                    <View style={styles.vfield}>
                        <ScrollView>
                        {Object.keys(this.state.Allusers).map(key => {
                            return (
                                <TouchableOpacity 
                                onPress={() => this.handleUser(key)}> 
                                <Text style={styles.txtbtn} >{this.state.Allusers[key].username}</Text> 
                                </TouchableOpacity>
                            )
                        })}

                        </ScrollView>
                    </View>

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
    gambar:{
        width:'100%',
        height:'100%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt1: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#273c75',
        marginBottom:10,
    },
    txt2: {
        fontSize: 18,
        marginLeft: 25,
        color: 'white'
    },
    vbtn1:{
        flexDirection:'row',

    },
    btn1:{
        backgroundColor:'#e84118',
        alignItems:'center',
        justifyContent:'center',
        width :80,
        height:40,
        marginRight:25
    },
    txtbtn1:{
        color:'white'
    },
    field: {
        
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
        marginHorizontal:10,
        justifyContent:'center',
        flexDirection:'row'

    },
    txtbtn: {
        fontSize: 20,
        marginHorizontal: 15,
        marginBottom:5,
        color: '#636e72'

    },
    txtfield1: {
        marginRight: 30
    },
})
