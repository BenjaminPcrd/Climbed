import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons'

import SessionsStack from './SessionsStack'
import StatsStack from './StatsStack'

import { translate } from '../translations'

const Tab = createBottomTabNavigator()

const tabBarOptions = {
    activeBackgroundColor: 'darkblue',
    activeTintColor: 'white',
    inactiveBackgroundColor: 'white',
    inactiveTintColor: 'darkblue',
    labelPosition: 'beside-icon',
    keyboardHidesTabBar: true
}

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName
        switch(route.name) {
            case 'SessionsStack': iconName = 'list-circle-outline'; break
            case 'StatsStack': iconName = 'stats-chart'; break
        }
        return <Icon name={iconName} size={size} color={color} />
    }
})


const AppTabs = () => {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <Tab.Screen name="SessionsStack" component={SessionsStack} options={{ title: translate('sessions') }}/>
            <Tab.Screen name="StatsStack" component={StatsStack} options={{ title: translate('stats') }}/>
        </Tab.Navigator>
    )
}

export default AppTabs