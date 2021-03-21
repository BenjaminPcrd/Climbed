import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Stats from '../screens/Stats'
import GradeDistribution from '../screens/Stats/GradeDistribution'

import { translate } from '../translations'

const Stack = createStackNavigator()

const screenOptions = {
    headerStyle: {
        backgroundColor: 'darkblue',
    },
    headerTintColor: 'white'
}

const StatsStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Stats" component={Stats} options={() => ({ title: translate('stats') })}/>
            <Stack.Screen name="GradeDistribution" component={GradeDistribution} options={() => ({ title: translate('gradeDistribution') })}/>
        </Stack.Navigator>
    )
}

export default StatsStack