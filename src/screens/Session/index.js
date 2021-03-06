import React, { useEffect } from 'react'

import {
    FlatList,
    Alert,
    BackHandler
} from 'react-native'

import { useFocusEffect } from '@react-navigation/core'
import { HeaderBackButton } from '@react-navigation/stack'

import { deleteClimb } from '../../asyncStorageApi'

import Row from './row'
import Footer from './footer'
import Empty from './empty'

import { translate } from '../../translations'


const Session = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton tintColor='white' onPress={() => navigation.navigate('Sessions')} />
        })
    }, [])

    useFocusEffect(() => {
        const onBackPress = () => {
            navigation.navigate('Sessions')
            return true
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    })

    const onEditClimbPress = (climbToEdit) => {
        navigation.navigate('AddClimb', { session: route.params.session, climbToEdit })
    }

    const onDeleteClimbPress = (climbToDelete) => {
        deleteClimb(climbToDelete, route.params.session)
            .then((newSession) => navigation.setParams({ session: newSession }))
            .catch(e => console.error(e))
    }

    const renderItem = ({ item }) => {
        const onClimbPress = () => {
            navigation.navigate('Climb', { climb: item })
        }

        const onClimbLongPress = () => {
            Alert.alert(
                translate('editClimb'),
                translate('editMsg'),
                [
                    { text: translate('cancel') },
                    { text: translate('edit'), onPress: () => onEditClimbPress(item) },
                    { 
                        text: translate('delete'),
                        onPress: () => Alert.alert(
                            translate('deleteClimb'),
                            translate('deleteClimbMsg'),
                            [
                                { text: translate('cancel') },
                                { text: translate('delete'), onPress: () => onDeleteClimbPress(item) }
                            ],
                            { cancelable: true }
                        ) 
                    }
                ],
                { cancelable: true }
            )
        }

        return <Row item={item} onPress={onClimbPress} onLongPress={onClimbLongPress}/>
    }

    return (
        <FlatList 
            data={(route.params.session.climbs).sort((a, b) => b.index - a.index)}
            keyExtractor={(item, index) => item + index}
            
            renderItem={renderItem}
            ListFooterComponent={<Footer onPress={() => navigation.navigate('AddClimb', { session: route.params.session })}/>}
            ListEmptyComponent={Empty}

            contentContainerStyle={{ backgroundColor: 'white' }}
        />
    )
}

export default Session