import React, { useEffect } from 'react'

import {
    View,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native'

import Row from './row'

import { translate } from '../../translations'

const Session = ({ navigation, route }) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.4}>
                <Row item={item}/>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList 
            data={(route.params.session.climbs).sort((a, b) => b.index - a.index)}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            ListFooterComponent={<Button title={translate('addClimb')} color='darkblue' onPress={() => navigation.navigate('AddClimb', { session: route.params.session })}/>}
            ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: 'grey'}}/>}
        />
    )
}

export default Session