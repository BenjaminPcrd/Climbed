import React from 'react'

import {
    View,
    Pressable,
    Text,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import gradesTab from '../../assets/grades'
import { translate } from '../../translations'

const Row = ({ item, onPress, onLongPress }) => {

    const maxGrade = () => {
        return "6b"
    }

    const avgGrade = () => {
        return '5c+'
    }

    return (
        <Pressable style={styles.row} onPress={onPress} onLongPress={onLongPress}>
            <View>
                <View style ={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='calendar-outline' size={14}/>
                    <Text style={styles.date}> {new Date(item.date).toDateString()}</Text>
                    <Text style={styles.type}> - {item.type == 'INDOOR' && translate('indoorSession')}{item.type == 'OUTDOOR' && translate('outdoorSession')}</Text>
                </View>
                <View style ={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='location-outline' size={26}/>
                    <Text style={styles.location}> {item.location}</Text>
                </View>
            </View>

            <View style={{ borderRightWidth: 1, borderRightColor: 'lightgrey', marginVertical: 5 }}/>

            <View>
                <Text style={styles.stats}>{item.climbs.length}</Text>
                <Text style={styles.statsLabel}>{translate('climbs')}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row:  ({ pressed }) => [{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgrey',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    }],
    date: {
        color: 'grey',
        fontSize: 12,
    },
    type: {
        color: 'grey',
        fontSize: 12,
        fontStyle: 'italic'
    },
    location: {
        color: 'darkblue',
        fontSize: 30,
        fontWeight: 'bold'
    },
    statsLabel: {
        color: 'grey',
        fontSize: 12
    },
    stats: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default Row