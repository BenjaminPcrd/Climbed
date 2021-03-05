import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { translate } from '../../translations'

const Row = ({ item }) => {
    return (
        <View style={styles.row}>
            <View>
                <Text style={styles.location}>{item.location}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.type}>{item.type == 'INDOOR' && translate('indoorSession')} {item.type == 'OUTDOOR' && translate('outdoorSession')}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    location: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    type: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    date: {
        textAlign: 'right',
        color: 'grey',
        fontSize: 14
    }
})

export default Row