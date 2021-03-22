import React from 'react'

import {
    processColor
} from 'react-native'

import { PieChart } from 'react-native-charts-wrapper'

const Pie = ({ route }) => {
    return (
        <PieChart
            style={{ flex: 1, margin: 10 }}
            data={{
                dataSets: [{
                    values: route.params.data.values,
                    label: route.params.data.label,
                    config: {
                        colors: Array.from({ length: route.params.data.values.length }, () => processColor(`rgb(${Math.floor(Math.random() * (255 - 100)) + 100}, ${Math.floor(Math.random() * (255 - 100)) + 100}, ${Math.floor(Math.random() * (255 - 100)) + 100})`)),
                        valueTextSize: 18,
                        valueTextColor: processColor('black'),
                        sliceSpace: 5,
                        valueFormatter: "###",
                    }
                }]
            }}

            usePercentValues={false}
            chartDescription={{ text: '' }}
            legend={{ enabled: false }}
            touchEnabled={false}

            entryLabelColor={processColor('darkblue')}
            entryLabelTextSize={18}
            
            styledCenterText={{ text:'', color: processColor('black'), size: 20 }}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('transparent')}
            transparentCircleRadius={0}
        />
    )
}

export default Pie