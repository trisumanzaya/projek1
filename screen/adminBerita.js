import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, TextInput, ScrollView, Alert, ImageBackground } from 'react-native'
// import firebase from './config/FIREBASE'



export default class adminBerita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            berita:'',
            notifikasi:''
        };
    }

    

    
            
    handleChangeTextBerita = (e) => {
        // console.log(e)
        this.setState({
            berita: e,
        })
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

    handleBeritaSubmit = () => {
        const { berita } = this.state
        // console.log(work,uid);
        const data = {
            detail: berita
        }
        firebase.database().ref('notifikasi/').push(data)
            .then(async () => {
                console.log("New poll data sent!")
                await this.getUserInfo();
                return this.setState({
                    berita: '',
                })
            })
            .catch(error => console.log("Error when creating new poll.", error));
    }

    handleButonClose = (notifikasiId) => {
        const { notifikasi } = this.state
        // console.log(work,uid);

        const data = {
            detail: notifikasi
        }
        Alert.alert("pesan telah dihapus")
        firebase.database().ref('notifikasi/' + notifikasiId).remove()
            .then(async () => {
                console.log("New poll data sent!")
                await this.getUserInfo();

            })
            .catch(error => console.log("Error when creating new poll.", error));
    }


    


    // UNSAFE_componentWillMount() {
    //     console.log('ini', this.props.route.params);
    //     this.setState({ from_admin: this.props.route.params.from_admin })
    //     this.setState({ uid: this.props.route.params.uid })
    // }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>

                    {/* <Text style={styles.txt1}> {this.state.user} </Text>
                <Text style={styles.txt2}> {this.state.phone} </Text>
                <Text style={styles.txt2}> {this.state.email} </Text> */}
                    
                    <View style={styles.field}>

                        <TextInput id="email" style={styles.inputText}
                            placeholder="Rencana tugas client"
                            placeholderTextColor="#636e72"
                            onChangeText={this.handleChangeTextBerita} value={this.state.berita} />
                    </View>
                    <View style={styles.field}></View>

                    <TouchableOpacity style={styles.btn} onPress={this.handleBeritaSubmit}>
                        <Text style={styles.txtbtn}>submit</Text>
                    </TouchableOpacity>
                    <View style={styles.vresult}>
                        <ScrollView>
                            {Object.keys(this.state.notifikasi).map(key => {
                                return (

                                    <View style={styles.voutput}>
                                        <Text style={styles.txtoutput} >{this.state.notifikasi[key].detail}</Text>
                                        <TouchableOpacity style={styles.btnclose} onPress={() => this.handleButonClose(key)}>
                                            <Text style={styles.close}>x</Text>
                                        </TouchableOpacity>
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
        flex: 1,
        backgroundColor: "white",

    },
    gambar: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt1: {
        fontSize: 40,

        marginLeft: 18,
        fontWeight: 'bold',
        color: '#273c75'
    },
    txt2: {
        fontSize: 18,
        marginLeft: 25,
        color: '#273c75'
    },
    field: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 30,
        borderColor: '#636e72',
        borderWidth: 1
    },
    vfield: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 10
    },
    txtfield: {
        fontSize: 15,
        marginLeft: 15,

    },
    txtfield1: {
        marginRight: 30
    },
    btn: {
        width: '65%',
        backgroundColor: "#fff200",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginHorizontal: 60
    },
    vresult: {
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20

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
    btnclose: {
        backgroundColor: '#636e72',
        borderRadius: 10,
        height: 20,
        marginHorizontal: 10,
        width: 20,
    },
    close: {
        textAlign: 'center',
        color: 'white'
    }

})
