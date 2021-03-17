import React from 'react'
import { 
    View,
    Text,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Foundation'

import { translate } from '../../translations'

const Empty = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='mountains' size={50}/>   
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
                <Text style={styles.msg}>{translate('emptySessionMsg')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgrey',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 10
    },
    msg: {
        color: 'darkblue',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Empty