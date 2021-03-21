import React, { useState, useEffect } from 'react'

import {
    View,
    processColor
} from 'react-native'

import { PieChart } from 'react-native-charts-wrapper'

import { getSessions } from'../../asyncStorageApi'

import { translate } from '../../translations'

const ModeDistribution = () => {
    const [data, setData] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const sessions = await getSessions()
        let modes = sessions.map(s => s.climbs).flat().map(c => c.mode).filter(m => m != undefined)
        let values = {}
        modes.forEach(g => values[g] = values[g] ? values[g] + 1 : 1)

        setData({
            dataSets: [{
                values: Object.entries(values).map(v => ({ label: translate(v[0]), value: v[1] })),
                label: 'Grade distribution',
                config: {
                    colors: Array.from({ length: Object.entries(values).length }, () => processColor(`rgb(${Math.floor(Math.random() * (255 - 100)) + 100}, ${Math.floor(Math.random() * (255 - 100)) + 100}, ${Math.floor(Math.random() * (255 - 100)) + 100})`)),
                    valueTextSize: 18,
                    valueTextColor: processColor('black'),
                    sliceSpace: 5,
                    valueFormatter: "###",
                }
            }]
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <PieChart
                style={{ flex: 1 }}
                data={data}

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
        </View>
    )
}

export default ModeDistribution