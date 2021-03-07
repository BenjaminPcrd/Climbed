import React, { useEffect } from 'react'

import {
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'

import { HeaderBackButton } from '@react-navigation/stack'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Row from './row'

import { translate } from '../../translations'

//navigation.reset({ index: 0, routes: [{ name: 'Sessions' }]})

const Session = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton tintColor='white' onPress={() => navigation.navigate('Sessions')} />
        })
    }, [])

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
            navigation.setParams({ session: newSession })
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
            data={(route.params.session.climbs).sort((a, b) => b.index - a.index)}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            ListFooterComponent={<Button title={translate('addClimb')} color='darkblue' onPress={() => navigation.navigate('AddClimb', { session: route.params.session })}/>}
            ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: 'grey'}}/>}
        />
    )
}

export default Session