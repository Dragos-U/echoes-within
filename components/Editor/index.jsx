'use client'
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/services/apiService";
import EditorTextArea from "./EditorTextArea";
import AnalysisPanel from "./AnalysisPanel";

export default function Editor({entry}) {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    useAutosave({
        data: value,
        onSave: async (newValue) => {
            setIsLoading(true);
            const data = await updateEntry(entry.id, newValue)
            setAnalysis(data.analysis)
            setIsLoading(false)
        }
    })

    return (
        <div className={`
            h-screen
            flex
            flex-col
            md:flex-row`}>
            <EditorTextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                isLoading={isLoading}
            />
            <AnalysisPanel analysis={analysis} />
        </div>
    )
}