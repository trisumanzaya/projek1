import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, TextInput, ScrollView,Alert } from 'react-native'
// import firebase from './config/FIREBASE'



export default class adminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            phone: '',
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
        }
        console.log(userId);
        firebase.database().ref('/users/' + userId).once('value')
            .then((snapshot) => {
                const user = snapshot.val();
                console.log('user login: ', user);
                this.setState({
                    user: user.username,
                    email: user.email,
                    phone: user.phone,
                    todolist: user.todolist
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                Alert.alert("Gagal")
            });
    }

    handleChangeTextWork = (e) => {
        // console.log(e)
        this.setState({
            work: e,
        })
    }

    handleWorkSubmit =  () => {
        const { work,uid} = this.state
        // console.log(work,uid);
        const data = {
            detail:work
        }
        firebase.database().ref('users/' + uid + '/todolist').push(data)
            .then(async() => {
                console.log("New poll data sent!")
                await this.getUserInfo();
            })
            .catch(error => console.log("Error when creating new poll.", error));
    }


    handleButonClose =()=>{
        Alert.alert('saya ganteng')
    }


    UNSAFE_componentWillMount() {
        console.log('ini', this.props.route.params);
        this.setState({ from_admin: this.props.route.params.from_admin })
        this.setState({ uid: this.props.route.params.uid })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt1}> {this.state.user} </Text>
                <Text style={styles.txt2}> {this.state.phone} </Text>
                <Text style={styles.txt2}> {this.state.email} </Text>
                <View style={styles.field}>
                    <View style={styles.vfield}>
                        <TextInput id="email" style={styles.inputText}
                            placeholder="Rencana tugas client"
                            placeholderTextColor="#636e72"
                            onChangeText={this.handleChangeTextWork} />
                    </View>

                </View>
                <TouchableOpacity style={styles.btn} onPress={this.handleWorkSubmit}>
                    <Text style={styles.txtbtn}>submit</Text>
                </TouchableOpacity>
                <View style={styles.vresult}>
                    <ScrollView>
                        {Object.keys(this.state.todolist).map(key => {
                            return (
                        
                                <View style={styles.voutput}>    
                                <Text style={styles.txtoutput} >{this.state.todolist[key].detail}</Text> 
                                <TouchableOpacity style={styles.btnclose}>
                                    <Text style={styles.close}>x</Text>
                                </TouchableOpacity>
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
        marginTop: 10,
        marginHorizontal: 60
    },
    vresult: {
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop:20

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
    btnclose:{
        backgroundColor:'#636e72',
        borderRadius:10,
        height:20,
        marginHorizontal:10,
        width:20,
    },
    close:{
        textAlign:'center',
        color:'white'
    }

})
