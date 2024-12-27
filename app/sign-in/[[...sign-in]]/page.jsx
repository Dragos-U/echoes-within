import {SignIn} from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className='w-screen h-screen bg-black/85 flex items-center justify-center'>
            <SignIn/>
        </div>
    )
}