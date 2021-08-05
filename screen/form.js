import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput,TouchableOpacity } from 'react-native'



export class admin extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style ={styles.txt1} >WEKER Admin</Text>
                <View style={styles.bx1}>
                    <TextInput
                        
                        id="password"
                      
                        placeholder="rencana kegiatan"
                        placeholderTextColor="#636e72"
                         />
                </View>
                <View style={styles.bx1}>
                    <TextInput
                        
                        id="password"
                      
                        placeholder="rencana kegiatan"
                        placeholderTextColor="#636e72"
                         />
                </View>
                <View style={styles.btn1}>
                <TouchableOpacity  onPress="">
                    <Text >submit</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.field} >

                </View>
            </View>
        )
    }
}

export default admin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#74b9ff",
        alignItems: 'center',

    },
    bx1:{
        width:300,
        backgroundColor: "white",
        borderRadius:10,
        marginBottom:10
    },
    txt1:{
        fontSize:40,
        marginTop:50,
        marginBottom:50,
        color: 'white'
    },
    btn1:{
        backgroundColor:"#fff200",
        width:150,
        height:40,
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    field:{
        backgroundColor:"white",
        width:300,
        height:200,
        marginTop:50,
        borderRadius:10
    }
})
