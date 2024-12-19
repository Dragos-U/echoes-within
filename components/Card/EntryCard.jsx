import {formatDate} from "@/utils/dateFormater";

export default function EntryCard({entry}) {
    const date = formatDate(entry.createdAt);
    const {subject, negative, mood, color} = entry.analysis;
    const emoticon = negative ? '😔' : '😃';
    const generalStyle = 'px-4 py-2'
    return (<div
        className={`
            animate-[fadeIn_0.6s_ease-in-out] 
            group 
            hover:scale-[1.03] 
            divide-y 
            divide-gray-200 
            overflow-hidden 
            rounded-lg 
            bg-white shadow`}>
        <div className={`
            font-semibold 
            ${generalStyle} 
            text-gray-700`}>
            {date}
        </div>
        <div className={`
            italic 
            ${generalStyle}
         text-gray-600`}>
            {subject}
        </div>
        <div className={`
            ${generalStyle} 
            text-gray-700 
            flex 
            items-center 
            gap-2`}>
            {`${emoticon} ${mood}`}
        </div>
    </div>)
}