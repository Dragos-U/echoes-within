'use client'

import {ResponsiveContainer, LineChart, Line, XAxis, Tooltip, YAxis, CartesianGrid, Label} from 'recharts'

function CustomTooltip({payload, label, active}) {
    if (!active || !payload?.length) return null;

    const dateLabel = new Date(label).toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    const analysis = payload[0].payload;

    return (
        <div className={`
            p-6
            custom-tooltip 
            bg-white 
            shadow-lg 
            border 
            border-gray-200 
            rounded-lg 
            backdrop-blur-md 
            relative
        `}>
            <div
                className='absolute left-3 top-3 w-3 h-3 rounded-full'
                style={{background: analysis.color}}
            />
            <p className='text-sm text-gray-500 mb-1'>{dateLabel}</p>
            <p className='text-xl font-medium text-gray-800'>
                {analysis.mood}
            </p>
            <p className='text-sm text-gray-600 mt-1'>
                Score: {analysis.sentimentScore}
            </p>
        </div>
    )
}

export default function SentimentChart({data}) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 30,
                }}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis
                    dataKey='createdAt'
                    tick={{fill: '#6B7280'}}
                    tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-us', {
                            day: 'numeric'
                        })}}>
                    <Label
                    value='Timeline'
                    position='bottom'
                    offset={5}
                    style={{
                        textAnchor: 'middle',
                        fill: '#666666',
                        fontSize: 16
                    }}/>
                </XAxis>
                <YAxis
                    tick={{fill: '#6B7280'}}
                    domain={['dataMin - 1', 'dataMax + 1']}>
                    <Label
                        value='Sentiment Score'
                        position='left'
                        angle={-90}
                        offset={-15}
                        style={{
                            textAnchor: 'middle',
                            fill: '#666666',
                            fontSize: 16
                        }}/>
                </YAxis>
                <Tooltip content={<CustomTooltip/>}/>
                <Line
                    type='monotone'
                    dataKey='sentimentScore'
                    stroke='#6366F1'
                    strokeWidth={2}
                    dot={true}
                    activeDot={{
                        r: 6,
                        stroke: '#4F46E5',
                        strokeWidth: 2,
                        fill: '#fff'
                    }}/>
            </LineChart>
        </ResponsiveContainer>
    )
}