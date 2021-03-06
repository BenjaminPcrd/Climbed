import React, { useState, useCallback } from 'react'

import {
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Button
} from 'react-native'

import Row from './row'

import { translate } from '../../translations'

var sessions = require('../../sessions.json')

const Sessions = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 2000)
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.4} onPress={() => {
                navigation.navigate('Session', { session: item, title: `${item.location} - ${new Date(item.date).toLocaleDateString()}` })
            }}>
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