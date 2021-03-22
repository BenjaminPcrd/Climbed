import React, { useState, useEffect } from 'react'

import {
    View,
    Text,
    Pressable,
    StyleSheet,
    processColor
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import { getSessions } from '../../asyncStorageApi'

import gradesTab from '../../assets/grades'

import { translate } from '../../translations'

const Stats = ({ navigation }) => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        getSessions()
            .then(newSessions => setSessions(newSessions))
            .catch(e => console.error(e))
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSessions()
                .then(newSessions => setSessions(newSessions))
                .catch(e => console.error(e))
        })
        return unsubscribe
    }, [navigation])

    const getGradeDistributionData = () => {
        let grades = sessions.map(s => s.climbs).flat().map(c => c.grade)
        let sport = grades.map(g => g.grade).sort((a, b) => gradesTab['SPORT_CLIMBING']['FR'].indexOf(a) - gradesTab['SPORT_CLIMBING']['FR'].indexOf(b))
        let values = {}
        sport.forEach(g => values[g] = values[g] ? values[g] + 1 : 1)

        return { values: Object.entries(values).map(v => ({ label: v[0], value: v[1] })), label: translate('gradeDistribution') }
    }

    const getModeDistributionData = () => {
        let modes = sessions.map(s => s.climbs).flat().map(c => c.mode).filter(m => m != undefined)
        let values = {}
        modes.forEach(g => values[g] = values[g] ? values[g] + 1 : 1)

        return { values: Object.entries(values).map(v => ({ label: translate(v[0]), value: v[1] })), label: translate('modeDistribution') }
    }

    const getStyleDistributionData = () => {
        let modes = sessions.map(s => s.climbs).flat().map(c => c.style).filter(m => m != undefined)
        let values = {}
        modes.forEach(g => values[g] = values[g] ? values[g] + 1 : 1)

        return { values: Object.entries(values).map(v => ({ label: translate(v[0]), value: v[1] })), label: translate('styleDistribution') }
    }

    return (
        <View>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Pie', { data: getGradeDistributionData(), title: translate('gradeDistribution') })}>
                <Text style={styles.text}>{translate('gradeDistribution')}</Text>
                <Icon name='chevron-forward' size={25} style={styles.icon}/>
            </Pressable>
            <View style={styles.separator}/>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Pie', { data: getModeDistributionData(), title: translate('modeDistribution') })}>
                <Text style={styles.text}>{translate('modeDistribution')}</Text>
                <Icon name='chevron-forward' size={25} style={styles.icon}/>
            </Pressable>
            <View style={styles.separator}/>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Pie', { data: getStyleDistributionData(), title: translate('styleDistribution') })}>
                <Text style={styles.text}>{translate('styleDistribution')}</Text>
                <Icon name='chevron-forward' size={25} style={styles.icon}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item: ({ pressed }) => [{
        backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    }],
    text: {
        fontSize: 16
    },
    icon: {
        flex: 1,
        textAlign: 'right'
    },
    separator: {
        backgroundColor: 'lightgrey',
        height: 1
    }
})
export default Stats