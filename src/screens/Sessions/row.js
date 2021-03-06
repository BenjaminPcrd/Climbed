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
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='location-outline' size={18}/>
                    <Text style={styles.location}> {item.location}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.climbs}>{item.climbs.length} {translate('climbs')}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.type}>{item.type == 'INDOOR' && translate('indoorSession')} {item.type == 'OUTDOOR' && translate('outdoorSession')}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={styles.date}>{new Date(item.date).toDateString()} </Text>
                    <Icon name='calendar-outline' size={14}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        padding: 10
    },
    location: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    climbs: {
        textAlign: 'right',
        color: 'darkblue',
        fontSize: 12
    },
    type: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    date: {
        color: 'grey',
        fontSize: 14
    }
})

export default Row