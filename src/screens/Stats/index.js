import React from 'react'

import {
    View,
    Text,
    Pressable,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const Stats = ({ navigation }) => {
    return (
        <View>
            <Pressable style={styles.item} onPress={() => navigation.navigate('GradeDistribution')}>
                <Text style={styles.text}>Grade distribution</Text>
                <Icon name='chevron-forward' size={25} style={styles.icon}/>
            </Pressable>
            <View style={styles.separator}/>
            <Pressable style={styles.item}>
                <Text style={styles.text}>Style distribution</Text>
                <Icon name='chevron-forward' size={25} style={styles.icon}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item: ({ pressed }) => [{
        backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    }],
    text: {
        fontSize: 16
    },
    icon: {
        flex: 1,
        textAlign: 'right'
    },
    separator: {
        backgroundColor: 'lightgrey',
        height: 1
    }
})
export default Stats