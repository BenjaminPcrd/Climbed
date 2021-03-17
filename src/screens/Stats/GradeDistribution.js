import React, { useState, useEffect } from 'react'

import {
    View,
    Text,
    processColor
} from 'react-native'

import { BarChart } from 'react-native-charts-wrapper'

import gradesTab from '../../assets/grades'

import { getSessions } from'../../asyncStorageApi'

const GradeDistribution = () => {
    const [data, setData] = useState()
    const [xAxis, setXAxis] = useState()
    const [yAxis, setYAxis] = useState()

    useEffect(() => {
        getData()

    }, [])

    const getData = async() => {
        const sessions = await getSessions()
        let grades = sessions.map(s => s.climbs).flat().map(c => c.grade)
        let sport = grades.map(g => g.grade).sort((a, b) => gradesTab['SPORT_CLIMBING']['FR'].indexOf(a) - gradesTab['SPORT_CLIMBING']['FR'].indexOf(b))
        let values = {}
        sport.forEach(g => values[g] = values[g] ? values[g] + 1 : 1)
        
        setData({
            dataSets:[
                {
                    label: "Grade count", 
                    values: Object.values(values).map(v => ({y: v})),
                    config: {
                        color: processColor('darkblue'),
                        valueFormatter: "###",
                        valueTextSize: 14,
                        valueTextColor: processColor('white')
                    }
                }
            ],
            config: {
                barWidth: 0.7,
                valueFormatter: "$###.0",
                drawValues: true,
            }
        })
        
        setXAxis({
            position: 'BOTTOM',
            textSize: 14,
            valueFormatter: Object.keys(values),
            granularityEnabled: true,
            granularity : 1,
            drawGridLines: false,
            drawAxisLine: true,
        })

        setYAxis({
            right: {
                enabled: true,
                drawGridLines: false,
                drawAxisLine: true,
                drawLabels: false,
            },
            left: {
                enabled: true,
                drawGridLines: true,
                drawAxisLine: true,
                drawLabels: false,
                granularityEnabled: true,
                granularity : 1,
                textSize: 14,
            }
        })
        
    }

    return (
        <View style={{ flex: 1 }}>
            <BarChart
                data={data}
                xAxis={xAxis}
                yAxis={yAxis}

                chartDescription={{ text: '' }}
                legend={{ enabled: false }}
                touchEnabled={false}
                drawValueAboveBar={false}
                
                style={{ flex: 1 }}
            />
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

export default GradeDistribution