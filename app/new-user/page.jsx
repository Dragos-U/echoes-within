import {redirect} from 'next/navigation';
import {createNewUserIfNotExists} from '@/services/userService';

async function createNewUser() {
    await createNewUserIfNotExists();
    redirect('/journal');
}

export default async function NewUser() {
    await createNewUser();
    return <h1>Loading...</h1>;
}