import React from 'react'

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button
} from 'react-native'

const Routes = ({ navigation }) => {

    const AddARoutePressed = () => {
        navigation.navigate('EditRoute')
    }

    return (
        <View>
            <Button title="Add a route" onPress={AddARoutePressed}/>
        </View>
    )
}

export default Routes