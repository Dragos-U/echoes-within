export default function EditorTextArea({ value, onChange, isLoading }) {
    return (
        <div className={`
            flex-1
            min-h-[50vh]
            md:min-h-full
            relative`}>
            {isLoading && (
                <div className={` 
                    text-center
                    bg-blue-400
                    text-white
                    py-1
                    rounded-md
                    text-sm`}>
                    Saving...
                </div>
            )}
            <textarea
                disabled={isLoading}
                className={`
                    w-full
                    h-full
                    p-4
                    md:px-8 
                    text-lg 
                    md:text-xl 
                    outline-none 
                    resize-none 
                    ${isLoading ? 'opacity-50' : ''}`}
                value={value}
                onChange={onChange}
                placeholder="Write your thoughts..."
            />
        </div>
    )
}