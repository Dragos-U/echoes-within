'use client'

import {createNewEntry} from "@/services/apiService";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function NewEntryCard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleOnClick() {
        try {
            const data = await createNewEntry();
            router.push(`/journal/${data.id}`);
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-10" onClick={handleOnClick}>
                {isLoading ? (
                    <span>Creating...</span>
                ) : (
                    <span className="text-3xl italic">New Entry</span>
                )}
            </div>
        </div>
    );
}