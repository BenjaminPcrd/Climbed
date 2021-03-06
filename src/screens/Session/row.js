import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import SportClimbingIcon from "../../assets/route_type_sport.svg"
import TradClimbingIcon from "../../assets/route_type_trad.svg"
import IceClimbingIcon from "../../assets/route_type_ice.svg"
import AidClimbingIcon from "../../assets/route_type_aid.svg"
import BoulderingIcon from "../../assets/route_type_bouldering.svg"

import { translate } from '../../translations'

const Row = ({ item }) => {
    return (
        <View style={styles.row}>
            <View style={{flex: 1}}>
                {item.type === 'SPORT_CLIMBING' && <SportClimbingIcon width={50} height={50} fill={"black"}/>}
                {item.type === 'TRAD_CLIMBING' && <TradClimbingIcon width={50} height={50} fill={"black"}/>}
                {item.type === 'ICE_CLIMBING' && <IceClimbingIcon width={50} height={50} fill={"black"}/>}
                {item.type === 'AID_CLIMBING' && <AidClimbingIcon width={50} height={50} fill={"black"}/>}
                {item.type === 'BOULDERING' && <BoulderingIcon width={50} height={50} fill={"black"}/>}
            </View>
            <View style={{flex: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.grade}>{item.grade.grade}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <Text style={styles.mode}>{translate(item.mode)}</Text>
                        {item.pitches && <Text style={styles.pitches}> - {item.pitches} {translate('pitches')}</Text>}
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.style}>{translate(item.style)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        padding: 10,
        flexDirection: 'row'
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
    pitches: {
        color: 'grey'
    },
    style: {
        color: 'grey',
        textAlign: 'center'
    }
})

export default Row