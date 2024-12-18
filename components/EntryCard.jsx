import {formatDate} from "@/utils/dateFormater";

export default function EntryCard({entry}) {
    const date = formatDate(entry.createdAt);
    const {subject, negative, mood, color} = entry.analysis;
    const emoticon = negative ? '😔' : '😃';
    const generalStyle = 'px-4 py-2'
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className={`font-semibold ${generalStyle}`}>{date}</div>
            <div className={`italic ${generalStyle}`}>{subject}</div>
            <div className={` ${generalStyle}`}>{`${emoticon} ${mood}`}</div>
        </div>
    )
}