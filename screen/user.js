import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class user extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt1}> nama user </Text>
                <Text style={styles.txt2}> nomor telfone </Text>
                <Text style={styles.txt2}> email </Text>
                <View style={styles.field}>
                    <View style={styles.vfield}>
                    <Text style={styles.txtfield}>isi task list kerjaan dari client</Text>
                    <Text style={styles.txtfield1}>x</Text>
                    </View>

                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txtbtn}>submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
            flex: 1,
            backgroundColor: "#74b9ff",
            
    },
    txt1:{
        fontSize:40,
        marginTop:30,
        marginLeft:10,
        fontWeight:'bold',
        color: 'white'
    },
    txt2:{
        fontSize:18,
        marginLeft:25,
        color: 'white'
    },
    field:{
        backgroundColor: 'white',
        width: '90%',
        height:'60%', 
        marginHorizontal:20,
        marginTop:30,
        borderRadius:30
    },
    vfield:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        marginTop:10
    },
    txtfield:{
        fontSize:15,
        marginLeft:15,
        
    },
    txtfield1:{
        marginRight:30
    },
    btn:{
        width: '65%',
        backgroundColor: "#fff200",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        marginHorizontal:60
    }
})
