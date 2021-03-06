import React, { useState, useEffect, useCallback } from 'react'

import {
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Button,
    Alert
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Row from './row'

import { translate } from '../../translations'

const Sessions = ({ navigation }) => {
    const [sessions, setSessions] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getSessions()
    }, [])

    useEffect(() => {
        getSessions()
    }, [])

    const getSessions = async () => {
        try {
            const jsonSessions = await AsyncStorage.getItem('@sessions')
            if (jsonSessions != null) {
                setSessions(JSON.parse(jsonSessions))
            }
            setRefreshing(false)
        } catch(e) {
            console.error(e)
        }
    }

    const deleteSession = async (sessionToDelete) => {
        try {
            const jsonSessions = await AsyncStorage.getItem('@sessions')
            let newSessions
            if (jsonSessions != null) {
                const oldSessions = JSON.parse(jsonSessions)
                newSessions = oldSessions
                newSessions.splice(oldSessions.findIndex(s => s.id === sessionToDelete.id), 1)
            } else {
                const oldSessions = JSON.parse(jsonSessions)
                newSessions = oldSessions
            }
            await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
            onRefresh()
        } catch(e) {
            console.error(e)
        }
    }

    const renderItem = ({ item }) => {
        const onSessionPress = () => {
            navigation.navigate('Session', { session: item, title: `${item.location} - ${new Date(item.date).toLocaleDateString()}` })
        }

        const onSessionLongPress = () => {
            Alert.alert(
                translate('deleteSession'),
                translate('deleteSessionMsg'),
                [
                    { text: translate('cancel') },
                    { text: translate('delete'), onPress: () => deleteSession(item) }
                ],
                { cancelable: true }
            )
        }

        return (
            <TouchableOpacity activeOpacity={0.4} onPress={onSessionPress} onLongPress={onSessionLongPress}>
                <Row item={item}/>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList 
            data={sessions.sort((a, b) => new Date(b.date) - new Date(a.date))}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            ListFooterComponent={<Button title={translate('addSession')} color='darkblue' onPress={() => navigation.navigate('AddSession')}/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['darkblue']}/>}
            ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: 'grey'}}/>}
        />
    )
}

export default Sessions