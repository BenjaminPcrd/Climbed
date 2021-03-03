import React from 'react'

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button
} from 'react-native'

const routes = require('../../routes.json')

const Routes = ({ navigation }) => {

    const AddARoutePressed = () => {
        navigation.navigate('EditRoute')
    }

    const renderRoute = ({ item }) => {
        return (
            <View style={styles.route}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {item.type == 'SPORT_CLIMBING' &&
                            <Text style={styles.grade}>{item.pitches[0].grade.grade}</Text>
                        }
                        {item.type == 'BOULDERING' &&
                            <Text style={styles.grade}>{item.grade.grade}</Text>
                        }
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        {item.type == 'SPORT_CLIMBING' &&
                            <Text style={styles.type}>Sport Climbing {item.pitches.length > 1 && ' - (First pitch)'}</Text>
                        }
                        {item.type == 'BOULDERING' &&
                            <Text style={styles.type}>Bouldering</Text>
                        }
                    </View>
                    <View style={{flex: 1}}>
                        {item.type == 'SPORT_CLIMBING' &&
                            <Text style={styles.method}>{item.pitches[0].method}</Text>
                        }
                        {item.type == 'BOULDERING' &&
                            <Text style={styles.method}>{item.method}</Text>
                        }
                    </View>
                </View>
                <View>
                    <Text style={styles.location}>{item.location} - {new Date(item.date).toDateString()}</Text>
                </View>
            </View>
        )
    }

    return (
        <FlatList  
            data={routes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRoute}
            ListFooterComponent={<Button title="Add a route" onPress={AddARoutePressed}/>}
            style={styles.mainContainer}
        />
            
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        backgroundColor: 'white'
    },
    route: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 10
    },
    name: {
        fontSize: 18,
        color: 'darkblue'
    },
    grade: {
        fontSize: 20,
        color: 'darkblue',
        textAlign: 'center'
    },
    type: {
        color: 'grey'
    },
    method: {
        color: 'grey',
        textAlign: 'center'
    },
    location: {
        color: 'lightgrey',
        textAlign: 'right'
    }
})

export default Routes