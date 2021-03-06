import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import { translate } from '../../translations'

const Row = ({ item }) => {
    return (
        <View style={styles.row}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 2}}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.grade}>{item.grade.grade}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 2}}>
                    <Text style={styles.mode}>{translate(item.mode)}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.style}>{translate(item.style)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    name: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    grade: {
        color: 'darkblue',
        fontSize: 22,
        textAlign: 'center'
    },
    mode: {
        color: 'grey'
    },
    style: {
        color: 'grey',
        textAlign: 'center'
    }
})

export default Row