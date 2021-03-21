import React from 'react'

import {
    View,
    Text
} from 'react-native'

import { translate } from '../../translations'

const Climb = ({ route }) => {
    return (
        <View>
            {Object.entries(route.params.climb).map(i => <Text>{translate(i[0])} : {JSON.stringify(i[1])}</Text>)}
        </View>
    )
}

export default Climb
