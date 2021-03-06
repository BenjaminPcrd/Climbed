import React, { useState } from 'react'

import {
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Row from './row'

import { translate } from '../../translations'

const Session = ({ navigation, route }) => {

    const [session, setSession] = useState(route.params.session)

    const deleteClimb = async (climbToDelete) => {
        try {
            const jsonSessions = await AsyncStorage.getItem('@sessions')
            let newSessions
            if (jsonSessions != null) {
                const oldSessions = JSON.parse(jsonSessions)
                newSessions = oldSessions
                let index = oldSessions.find(s => s.id === route.params.session.id).climbs.findIndex(c => c.index === climbToDelete.index)
                newSessions.find(s => s.id === route.params.session.id).climbs.splice(index, 1)
            } else {
                const oldSessions = JSON.parse(jsonSessions)
                newSessions = oldSessions
            }
            await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
            let newSession = newSessions.find(s => s.id === route.params.session.id)
            setSession(newSession)
        } catch(e) {
            console.error(e)
        }
    }

    const renderItem = ({ item }) => {
        const onClimbLongPress = () => {
            Alert.alert(
                translate('deleteClimb'),
                translate('deleteClimbMsg'),
                [
                    { text: translate('cancel') },
                    { text: translate('delete'), onPress: () => deleteClimb(item) }
                ],
                { cancelable: true }
            )
        }

        return (
            <TouchableOpacity activeOpacity={0.4} onLongPress={onClimbLongPress}>
                <Row item={item}/>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList 
            data={(session.climbs).sort((a, b) => b.index - a.index)}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            ListFooterComponent={<Button title={translate('addClimb')} color='darkblue' onPress={() => navigation.navigate('AddClimb', { session: route.params.session })}/>}
            ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: 'grey'}}/>}
        />
    )
}

export default Session