import React, { useEffect } from 'react'

import {
    View,
    Pressable,
    Text,
    FlatList,
    Alert,
    StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import { HeaderBackButton } from '@react-navigation/stack'

import { deleteClimb } from '../../asyncStorageApi'

import Row from './row'

import { translate } from '../../translations'

const Session = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton tintColor='white' onPress={() => navigation.navigate('Sessions')} />
        })
    }, [])

    const onEditClimbPress = (climbToEdit) => {
        navigation.navigate('AddClimb', { session: route.params.session, climbToEdit })
    }

    const onDeleteClimbPress = (climbToDelete) => {
        deleteClimb(climbToDelete, route.params.session)
            .then((newSession) => navigation.setParams({ session: newSession }))
            .catch(e => console.error(e))
    }

    const renderItem = ({ item }) => {
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

        return <Row item={item} onLongPress={onClimbLongPress}/>
    }

    const renderFooterComponent = () => {
        return (
            <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddClimb', { session: route.params.session })}>
                <Icon name='add-circle-outline' size={30} color='white'/>
                <Text style={styles.addButtonText}> {translate('addClimb')}</Text>
            </Pressable>
        )
    }

    return (
        <FlatList 
            data={(route.params.session.climbs).sort((a, b) => b.index - a.index)}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={renderItem}
            ListFooterComponent={renderFooterComponent}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent}/>}
        />
    )
}

const styles = StyleSheet.create({
    addButton: ({ pressed }) => [{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: pressed ? 'rgba(0, 0, 139, 0.7)' : 'darkblue'
    }],
    addButtonText: {
        color: 'white'
    },
    contentContainerStyle: {
        backgroundColor: 'white'
    },
    itemSeparatorComponent: {
        height: 3,
        backgroundColor: 'grey'
    }
})

export default Session