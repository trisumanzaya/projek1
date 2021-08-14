import { firebase } from '@react-native-firebase/database';
import React, { Component } from 'react'
import { Fragment } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, TextInput, ScrollView, Alert, ImageBackground } from 'react-native'
// import firebase from './config/FIREBASE'
import SearchableDropdown from 'react-native-searchable-dropdown';

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
            todolist: [],
            inputTugas: '',
            inputUsers: '',
            seletedUsers: [],
            Allusers: []
        };
    }

    async componentDidMount() {
        await this.getUsers();
    }

    getUsers = () => {
        firebase.database().ref('/users/').on('value', (snapshot) => {
            const users = Object.keys(snapshot.val()).map((key) => {
                const item = snapshot.val()[key];
                return { ...item, id: key, name: item.username };
            });
            console.log('user login: ', users);
            this.setState({
                Allusers: users

            })
        });
    }

    handleChangeTextWork = (e) => {
        console.log(e)
        this.setState({
            inputTugas: e,
        })
    }

    handleChangeTextUser = (e) => {
        console.log(e)
        this.setState({
            inputTugas: e,
        })
    }

    handleAddTugas = () => {
        const { inputTugas, todolist } = this.state
        todolist.push(inputTugas);

        return this.setState({
            todolist,
            inputTugas: '',
        })
    }


    handleWorkSubmit = () => {
        const { seletedUsers, todolist } = this.state
        seletedUsers.forEach(seletedUser => {
            todolist.forEach(item => {
                firebase.database().ref('users/' + seletedUser.id + '/todolist').push({detail: item})
                    .then(async () => {
                        console.log("New poll data sent!")
                    })
                    .catch(error => console.log("Error when creating new poll.", error));
            });
        });
        alert("New poll data sent!")
    }


    handleButonClose = (indexTodolist) => {
        const { todolist } = this.state
        todolist.splice(indexTodolist, 1);

        return this.setState({
            todolist
        })

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

                    <Text style={styles.txt1}> LIST PEKERJAAN </Text>
                
                    <View style={styles.field}>

                        <TextInput id="email" style={styles.inputText}
                            placeholder="Rencana tugas client"
                            placeholderTextColor="#636e72"
                            onChangeText={this.handleChangeTextWork} value={this.state.inputTugas} />
                    <TouchableOpacity style={styles.btn} onPress={() => this.handleAddTugas()}>
                        <Text style={styles.txtbtn}>add</Text>
                    </TouchableOpacity>
                    </View>

                    {/* <View style={styles.field}>
                        <TextInput placeholder="Search . . . "
                            placeholderTextColor="#636e72" />

                    </View> */}
                    <Fragment>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                const items = this.state.seletedUsers;
                                items.push(item)
                                this.setState({ seletedUsers: items });
                            }}
                            containerStyle={{ padding: 5 }}
                            onRemoveItem={(item, index) => {
                                const items = this.state.seletedUsers.filter((sitem) => sitem.id !== item.id);
                                this.setState({ seletedUsers: items });
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 30,
                            }}
                            itemTextStyle={{ color: '#222' }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={this.state.Allusers}
                            defaultIndex={2}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: "NAMA SATKER",
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        height:40,
                                        width:320,
                                        marginTop:10,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        borderRadius: 30,

                                    },
                                    // onTextChange: text => alert(text)
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </Fragment>
                    <View style={styles.field1}>
                        <ScrollView>
                            {this.state.seletedUsers.map((item, index) => {
                                return (

                                    <View style={styles.voutput}>
                                        <Text style={styles.txtoutput} >{item.username}</Text>
                                        <TouchableOpacity style={styles.btnclose} onPress={() => this.handleButonClose(index)}>
                                            <Text style={styles.close}>x</Text>
                                        </TouchableOpacity>
                                    </View>

                                )
                            })}

                        </ScrollView>
                    </View>

                    <View style={styles.vresult}>
                        <ScrollView>
                            {this.state.todolist.map((item, index) => {
                                return (

                                    <View style={styles.voutput}>
                                        <Text style={styles.txtoutput} >{item}</Text>
                                        <TouchableOpacity style={styles.btnclose} onPress={() => this.handleButonClose(index)}>
                                            <Text style={styles.close}>x</Text>
                                        </TouchableOpacity>
                                    </View>

                                )
                            })}

                        </ScrollView>

                    </View>
                    <TouchableOpacity style={styles.btn1} onPress={this.handleWorkSubmit}>
                        <Text style={styles.txtbtn}>submit</Text>
                    </TouchableOpacity>
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
        fontWeight: 'bold',
        color: '#273c75',
        marginBottom:20
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
        borderWidth: 1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    field1: {
        backgroundColor: 'white',
        width: '90%',
        height: 80,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 30,
        borderColor: '#636e72',
        borderWidth: 1,
        flexDirection:'row',
        justifyContent:'space-between'
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
        width: '25%',
        backgroundColor: "#fff200",
        borderRadius: 30,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',   
    },
    btn1: {
        width: '25%',
        backgroundColor: "#fff200",
        borderRadius: 30,
        height: 40,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',   
    },
    vresult: {
        width: '90%',
        height: '30%',
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
