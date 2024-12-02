'use client'

import {useState} from "react";
import {useAutosave} from "react-autosave";
import {updateEntry} from "@/utils/api";

export default  function EditorPage({entry}) {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis);

    const {subject, summary, mood, negative, color} =  analysis;
    const analysisData = [
        {name: 'Subject', value: subject},
        {name: 'Summary', value: summary},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'True' : 'False'},
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            const  data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis  )
            setIsLoading(false)
        }
    })
    return (
        <div className='w-full h-full grid grid-cols-3 '>
            <div className='col-span-2 '>
                {isLoading && <div>...loading</div>}
                <textarea className='w-full h-full  p-8 text-xl outline-none' value={value}
                          onChange={e => setValue(e.target.value)}/>
            </div>
            <div className='border-l border-b/3 '>
                <div className=' px-6 py-10' style={{backgroundColor: color}}>
                    <h2>Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map(item => (
                            <li key={item.name}
                                className='flex items-center justify-between px-2 py-2 border-b border-t border-b/10'>
                                <span className='text- l font-semibold'>{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}