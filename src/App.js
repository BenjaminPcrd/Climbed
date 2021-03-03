import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Routes from './screens/Routes'
import EditRoute from './screens/EditRoute'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Routes' component={Routes}/>
                <Stack.Screen name='EditRoute' component={EditRoute}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App