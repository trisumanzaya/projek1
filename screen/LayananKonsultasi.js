import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground,ScrollView, TextComponent } from 'react-native'

export default class LayananKonsultasi extends Component {
    render() {
        return (
            <View style={styles.container} >
                    
            <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
            <Text style={styles.txt}>Layanan Konsultasi</Text>
                
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
    }
})