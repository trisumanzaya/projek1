import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground,ScrollView, TextComponent } from 'react-native'
import { firebase } from '@react-native-firebase/database';

export default class LayananBerita extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifikasi:''
        };
    }

    async componentDidMount() {
        await this.getUserInfo();
    }

    getUserInfo = () => {
        // let notif =  this.state.notifikasi
        
            
        
        // console.log('apa sih',notif);
         firebase.database().ref('/notifikasi/' ).once('value')
            .then((snapshot) => {
                const detail = snapshot.val();
                console.log('pesan notif: ', detail);
                this.setState({
                    notifikasi: detail || {}
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                Alert.alert("Gagal")
            });
        }


    render() {
        return (
            <View style={styles.container} >
                    
            <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
                        <Text style={styles.txt}>NOTIFIKASI</Text>
                
                <View style={styles.vresult}>
                        <ScrollView>
                            {Object.keys(this.state.notifikasi).map(key => {
                                return (

                                    <View style={styles.voutput}>
                                        <Text style={styles.txtoutput} >{this.state.notifikasi[key].detail}</Text>
                                        {/* <TouchableOpacity style={styles.btnclose} onPress={() => this.handleButonClose(key)}>
                                            <Text style={styles.close}>x</Text>
                                        </TouchableOpacity> */}
                                    </View>

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
        flex:1,
        backgroundColor: "white",
        
    },
    gambar: {
        width: '100%',
        height: '100%',
        flex: 1,
        
    },
    txt:{
        fontWeight: 'bold',
        fontSize: 30,
        color: '#273c75',
        marginTop:50,
        marginLeft:10
    },
    field:{
        width:'80%',
        height:200,
        marginLeft:15,
        marginTop:50
    },
    vresult: {
        width: '90%',
        height: '50%',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 40

    },
    txtoutput: {
        color: '#636e72',
        marginLeft: 5,
        width: '80%'
    },
    voutput: {
        flex: 0,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        borderColor: '#636e72'
    },
})