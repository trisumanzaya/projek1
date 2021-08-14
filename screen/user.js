import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default class user extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            kodeSatker: '',
            from_admin: false,
            uid: '',
            work: '',
            todolist:{}
        };
    }

    async componentDidMount() {
        await this.getUserInfo();
    }

    getUserInfo = async () => {
        let userId = await AsyncStorage.getItem('uid');
        if (this.state.from_admin) {
            userId = this.state.uid;
            console.log(userId);
            firebase.database().ref('/users/' + userId).once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    console.log('user login: ', user);
                    this.setState({
                        user: user.username,
                        email: user.email,
                        phone: user.phone,
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
        }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt1}> {this.state.user} </Text>
                <Text style={styles.txt2}> {this.state.phone} </Text>
                <Text style={styles.txt2}> {this.state.email} </Text>
                <View style={styles.vresult}>
                    <ScrollView>
                    {Object.keys(this.state.todolist).map(key => {
                            return (
                        
                                <View style={styles.voutput}>    
                                <Text style={styles.txtoutput} >{this.state.todolist[key].detail}</Text> 
                                </View>
                        
                            )
                        })}
                        
                    </ScrollView>

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
        marginLeft: 18,
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
        height: 40,
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 30
    },
    vfield: {
        flex: 1,
        marginTop: 5,
        // marginBottom:10,
        marginHorizontal:10
    },
    txtfield: {
        fontSize: 15,
        marginLeft: 15,

    },
    txtfield1: {
        marginRight: 30
    },
    
    vresult:{
        width: '90%',
        height:'60%',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 50,
        
    },
    txtoutput: {
        color: '#636e72',
        marginLeft:5,
        width:'80%'
    },
    voutput: {
        flex:0,
        borderBottomWidth: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 10,
        width:'100%',
        borderColor: '#636e72'
    },
    
    
    
})
