export default function AnalysisPanel({ analysis }) {
    const { subject, summary, mood, negative, color } = analysis;

    const analysisData = [
        {name: 'Subject', value: subject},
        {name: 'Summary', value: summary},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'True' : 'False'},
    ]

    return (
        <div className={`
            md:w-[300px] 
            lg:w-[400px] 
            border-t 
            md:border-t-0 
            md:border-l 
            border-gray-200
            bg-blue-50/40`}>
            <div className={`sticky top-0`}>
                <div className={`
                    relative
                    px-4 
                    md:px-6 
                    py-6 
                    md:py-10
                    transition-colors
                    duration-300`}
                     style={{
                         backgroundColor: color + '20',
                     }}>
                    <div className={`
                        absolute
                        top-0
                        left-0
                        right-0
                        h-1`}
                         style={{backgroundColor: color}}>
                    </div>
                    <h2 className={`
                        text-xl 
                        font-semibold
                        tracking-wide
                        text-gray-800`}>
                        Reflection Insights
                    </h2>
                </div>
                <div className={`space-y-2`}>
                    {analysisData.map(item => (
                        <div key={item.name} className={`bg-gray-50 p-3 rounded-lg`}>
                            <div className={`flex items-center space-x-2 mb-1`}>
                                <span className={`
                                    px-3 
                                    py-1 
                                    bg-blue-100 
                                    text-blue-700 
                                    text-xs 
                                    rounded-full
                                `}>
                                    {item.name}
                                </span>
                            </div>
                            <p className={`text-gray-900`}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}