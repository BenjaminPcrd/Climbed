import React, { useState, useEffect, useCallback } from 'react'

import {
    FlatList,
    RefreshControl,
    Alert
} from 'react-native'

import { getSessions, deleteSession } from '../../asyncStorageApi'

import Row from './row'
import Footer from './footer'
import Empty from './empty'

import { translate } from '../../translations'

const Sessions = ({ navigation }) => {
    const [sessions, setSessions] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getSessions()
            .then(newSessions => setSessions(newSessions))
            .catch(e => console.error(e))
    }, [])

    useEffect(() => {
        setRefreshing(false)
    }, [sessions])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSessions()
                .then(newSessions => setSessions(newSessions))
                .catch(e => console.error(e))
        })
        return unsubscribe
    }, [navigation])

    const onEditSessionPress = (sessionToEdit) => {
        navigation.navigate('AddSession', { sessionToEdit })
    }

    const onDeleteSessionPress = (sessionToDelete) => {
        deleteSession(sessionToDelete)
            .then(onRefresh)
            .catch(e => console.error(e))
    }

    const renderItem = ({ item }) => {
        const onSessionPress = () => {
            navigation.navigate('Session', { session: item, title: `${item.location} - ${new Date(item.date).toLocaleDateString()}` })
        }

        const onSessionLongPress = () => {
            Alert.alert(
                translate('editSession'),
                translate('editMsg'),
                [
                    { text: translate('cancel') },
                    { text: translate('edit'), onPress: () => onEditSessionPress(item) },
                    { 
                        text: translate('delete'),
                        onPress: () => Alert.alert(
                            translate('deleteSession'),
                            translate('deleteSessionMsg'),
                            [
                                { text: translate('cancel') },
                                { text: translate('delete'), onPress: () => onDeleteSessionPress(item) }
                            ],
                            { cancelable: true }
                        ) 
                    }
                ],
                { cancelable: true }
            )
        }

        return <Row item={item} onPress={onSessionPress} onLongPress={onSessionLongPress}/>
    }

    return (
        <FlatList 
            data={sessions.sort((a, b) => new Date(b.date) - new Date(a.date))}
            keyExtractor={(item, index) => item + index}

            renderItem={renderItem}
            ListFooterComponent={<Footer onPress={() => navigation.navigate('AddSession')}/>}
            ListEmptyComponent={Empty}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['darkblue']}/>}

            contentContainerStyle={{ backgroundColor: 'white' }}
        />
    )
}

export default Sessions