import React, { useState, useCallback } from 'react'

import {
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Button
} from 'react-native'

import Row from './row'

import { translate } from '../../translations'

var sessions = require('../../sessions.json')

const Sessions = () => {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 2000)
    }, [])

    return (
        <FlatList 
            data={sessions}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <TouchableOpacity><Row item={item}/></TouchableOpacity>}
            ListFooterComponent={<Button title={translate('addSession')} color='darkblue'/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
    )
}

export default Sessions