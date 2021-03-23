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

const AppTabs = () => {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen 
                name="SessionsStack" 
                component={SessionsStack} 
                options={{ 
                    title: translate('sessions'),
                    tabBarIcon: ({ color, size }) => <Icon name="list-circle-outline" size={size} color={color} />
                }}
            />
            <Tab.Screen 
                name="StatsStack" 
                component={StatsStack} 
                options={{ 
                    title: translate('stats'),
                    tabBarIcon: ({ color, size }) => <Icon name="stats-chart" size={size} color={color} />,
                    unmountOnBlur: true
                }}
            />
        </Tab.Navigator>
    )
}

export default AppTabs