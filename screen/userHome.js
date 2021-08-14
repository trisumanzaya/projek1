import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground,ScrollView, TextComponent } from 'react-native'

export default class userHome extends Component {

    hendleLayananBerita = () =>{
        this.props.navigation.navigate('LayananBerita')
    }

    hendleInfoPekerja = () =>{
        this.props.navigation.navigate('InfoPekerjaanUser')
    }

    hendleLayananKonsultasi = () =>{
        this.props.navigation.navigate('LayananKonsultasi')
    }
    hendleKeluar = () =>{
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container} >
                    
            <ImageBackground source={require('./image/background1.png')} resizeMode="cover" style={styles.gambar}>
            
                <Text style={styles.Logo}> LAYANAN</Text>
                <Text style={styles.Logo}> WEKER</Text>
                <Image style={styles.img}
                    source={require('./image/WEKER.png')} />
                <TouchableOpacity style={styles.inputView} onPress={this.hendleLayananBerita}>
                    <Text style={styles.inputText}> BERITA TERBARU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputView} onPress={this.hendleInfoPekerja}>
                    <Text style={styles.inputText}> INFO PEKERJAAN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputView} onPress={this.hendleLayananKonsultasi}>
                    <Text style={styles.inputText}>LAYANAN KONSULTASI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.keluar} onPress={this.hendleKeluar}>
                    <Text style={styles.keluartxt} >KELUAR</Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    gambar: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Logo: {
        fontWeight: 'bold',
        fontSize: 40,
        fontWeight:'bold',
        color: '#273c75'
    },
    inputView: {
        width: "70%",
        backgroundColor: "#273c75",
        height: 50,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    inputText: {
        fontSize:20,
        color: 'white'
    },
    keluar: {
        width: '30%',
        backgroundColor: "#e84118",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10

    },
    img: {
        width:200,
        height:130,

    },
    keluartxt:{
        color:'white'
    }
})