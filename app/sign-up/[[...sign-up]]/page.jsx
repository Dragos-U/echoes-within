import {SignUp} from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='w-screen h-screen bg-black/85 flex items-center justify-center'>
            <SignUp/>
        </div>
    )
}