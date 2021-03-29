import React, { useState } from 'react'

import {
    View,
    Pressable,
    FlatList,
    Text,
    processColor,
    StyleSheet
} from 'react-native'

import { PieChart } from 'react-native-charts-wrapper'

const Pie = ({ route }) => {
    const [colors, setColors] = useState(Array.from({ length: route.params.data.values.length }, () => processColor('grey')))
    const [centerText, setCenterText] = useState('')
    const [selectedLabel, setSelectedLabel] = useState('')
    const [selectedHighlight, setSelectedHighlight] = useState([])

    const onSelect = item => {
        setSelectedLabel(item.label)
        setCenterText(item.value?.toString())
        let index = route.params.data.values.findIndex(i => item.label === i.label)
        index >= 0 ? setSelectedHighlight([{ x: index }]) : setSelectedHighlight([])
        setColors(Array.from({ length: route.params.data.values.length }, (_, i) => i == index ? processColor('darkblue') : processColor('grey')))
    }

    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.row} onPress={() => onSelect(selectedLabel === item.label ? {} : item)}>
                <View style={[styles.selector, { width: selectedLabel === item.label ? 3 : 0 }]}/>
                <Text style={styles.rowText}>{item.label}</Text>
                <Text style={styles.rowText}>{item.value}</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <PieChart
                style={styles.pie}
                data={{
                    dataSets: [{
                        values: route.params.data.values,
                        label: route.params.data.label,
                        config: {
                            colors: colors,
                            valueTextSize: 18,
                            valueTextColor: processColor('black'),
                            sliceSpace: 5,
                            selectionShift: 10,
                            drawValues: false,
                            valueFormatter: "###",
                            xValuePosition: 'OUTSIDE_SLICE',
                            valueLinePart1Length: 0.35,
                            valueLinePart2Length: 0.1,
                            valueLineColor: processColor('black'),
                            valueLineWidth: 2,
                            valueLinePart1OffsetPercentage: 75,
                            valueLineVariableLength: true,
                        }
                    }]
                }}

                usePercentValues={false}
                chartDescription={{ text: '' }}
                legend={{ enabled: false }}
                touchEnabled={true}
                rotationEnabled={false}

                drawEntryLabels={true}
                entryLabelColor={processColor('darkblue')}
                entryLabelTextSize={18}
                
                styledCenterText={{ text: centerText, color: processColor('black'), size: 20 }}
                centerTextRadiusPercent={100}

                holeRadius={75}
                holeColor={processColor('#f0f0f0')}

                transparentCircleRadius={0}
                transparentCircleColor={processColor('transparent')}

                onSelect={event => onSelect(event.nativeEvent.data || {})}

                highlights={selectedHighlight}
            />
            <FlatList 
                style={{ flex: 1 }}
                data={route.params.data.values}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgrey' }}/>}
            />
        </View>       
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    pie: {
        flex: 1,
        margin: 50
    },
    row:  ({ pressed }) => [{
        flexDirection: 'row',
        backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
    }],
    rowText: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10
    },
    selector: {
        backgroundColor: 'darkblue'
    }
})

export default Pie