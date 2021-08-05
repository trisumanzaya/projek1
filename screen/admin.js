import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class ExampleFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['User', 'page user'],
            tableData: [
                ['1', '4'],
                
            ]
        }
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    render() {
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <Text style={styles.text1}>admin WEKER</Text>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        state.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#74b9ff' },
    head: { height: 40, backgroundColor: '#fff200' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: 'white' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    text1:{fontSize:25,marginBottom:20,color:'white'}
});