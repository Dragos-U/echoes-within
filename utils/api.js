
function createURL(path) {
    const origin =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL;

    return `${origin}${path}`;
}

export async function createNewEntry(){
    const res = await fetch(new Request(createURL('/api/journal')),
        {
            method: 'POST',
        })
    if(res.ok) {
        const data= await res.json();
        return data.data;
    }
}

export async function updateEntry(id, content){
    const res = await fetch(new Request(createURL(`/api/journal/${id}`)),{
        method: 'PATCH',
        body: JSON.stringify({content})
    })

    if(res.ok){
        const data = await res.json();
        return data.data;
    }
}