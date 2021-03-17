import React from 'react'
import { 
    Pressable,
    Text,
    StyleSheet
} from 'react-native'

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons'

import { translate } from '../../translations'

const Footer = () => {
    const navigation = useNavigation()
    
    return (
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddSession')}>
            <Icon name='add-circle-outline' size={30} color='white'/>
            <Text style={styles.addButtonText}> {translate('addSession')}</Text>
        </Pressable>
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
    }
})

export default Footer