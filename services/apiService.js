import {createURL} from '@/utils/url'

/**
 * Creates a new journal entry by sending a POST request to the server.
 * @returns {Promise<Object>} A promise that resolves to the data of the newly created journal entry.
 * @throws {Error} Will throw an error if the network request fails or the response is not OK.
 */
export async function createNewEntry(){
    const res = await fetch(new Request(createURL('/api/journal')),
        {
            method: 'POST',
        })
    if(res.ok) {
        const data= await res.json();
        return data.data;
    } else {
        throw new Error('Failed to create a new journal entry');
    }
}

/**
 * Updates an existing journal entry by sending a PATCH request to the server.
 * @param {string} id - The ID of the journal entry to update.
 * @param {string} content - The new content for the journal entry.
 * @returns {Promise<Object>} A promise that resolves to the updated journal entry data.
 * @throws {Error} Will throw an error if the network request fails or the response is not OK.
 */
export async function updateEntry(id, content){
    const res = await fetch(new Request(createURL(`/api/journal/${id}`)),{
        method: 'PATCH',
        body: JSON.stringify({content})
    })

    if(res.ok){
        const data = await res.json();
        return data.data;
    } else {
        throw new Error(`Failed to update journal entry with ID: ${id}`);
    }
}

/**
 * Sends a question to the server and retrieves an answer.
 * @param {string} question - The question to be sent to the server.
 * @returns {Promise<Object>} A promise that resolves to the answer data from the server.
 * @throws {Error} Will throw an error if the network request fails or the response is not OK.
 */
export async function askQuestion(question){
    const res = await fetch(new Request(createURL('/api/question')),
        {
            method: 'POST',
            body: JSON.stringify({question})
        })
    if(res.ok) {
        const data= await res.json();
        return data.data;
    }
    else {
        throw new Error('Failed to retrieve an answer for the question');
    }
}