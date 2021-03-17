import React from 'react'

import {
    View,
    Pressable,
    Text,
    StyleSheet
} from 'react-native'

import SportClimbingIcon from "../../assets/route_type_sport.svg"
import TradClimbingIcon from "../../assets/route_type_trad.svg"
import IceClimbingIcon from "../../assets/route_type_ice.svg"
import AidClimbingIcon from "../../assets/route_type_aid.svg"
import BoulderingIcon from "../../assets/route_type_bouldering.svg"

import { translate } from '../../translations'

const Row = ({ item, onLongPress }) => {
    return (
        <Pressable style={styles.row} onLongPress={onLongPress}>
            {item.type === 'SPORT_CLIMBING' && <SportClimbingIcon width={50} height={50} fill={"black"} style={{ marginHorizontal: 10 }}/>}
            {item.type === 'TRAD_CLIMBING' && <TradClimbingIcon width={50} height={50} fill={"black"} style={{ marginHorizontal: 10 }}/>}
            {item.type === 'ICE_CLIMBING' && <IceClimbingIcon width={50} height={50} fill={"black"} style={{ marginHorizontal: 10 }}/>}
            {item.type === 'AID_CLIMBING' && <AidClimbingIcon width={50} height={50} fill={"black"} style={{ marginHorizontal: 10 }}/>}
            {item.type === 'BOULDERING' && <BoulderingIcon width={50} height={50} fill={"black"} style={{ marginHorizontal: 10 }}/>}

            <View style={{ flex: 2 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.mode}>{translate(item.mode)}</Text>
                {item.pitches && <Text style={styles.pitches}> - {item.pitches} {translate('pitches')}</Text>}
            </View>

            <View style={{ borderRightWidth: 1, borderRightColor: 'lightgrey', height: '75%' }}/>

            <View style={{ flex: 1 }}>
                <Text style={styles.grade}>{item.grade.grade}</Text>
                <Text style={styles.style}>{translate(item.style)}</Text>
            </View>
        </Pressable>
    ) 
}

const styles = StyleSheet.create({
    row:  ({ pressed }) => [{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgrey',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 10
    }],
    name: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    grade: {
        color: 'darkblue',
        fontSize: 22,
        textAlign: 'center',
    },
    mode: {
        color: 'grey'
    },
    pitches: {
        color: 'grey'
    },
    style: {
        color: 'grey',
        textAlign: 'center'
    }
})

export default Row