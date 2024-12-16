import {UserButton} from "@clerk/nextjs";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar"
import {currentUser} from "@clerk/nextjs/server";

export default async function Dashboard({children}) {
    const user = await currentUser();
    const firstName = user.firstName;

    return (
        <div className='relative h-screen font-mono'>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar/>
                <div className='w-full h-full'>
                    <header className='h-[60px] border-b border-black/10'>
                        <div className='h-full w-full px-6 flex items-center justify-between'>
                            <SidebarTrigger/>
                            <div className='flex justify-between gap-3'>
                                <p className='text-m'>{`Hi, ${firstName}`}</p>
                                <UserButton/>
                            </div>
                        </div>
                    </header>
                    <main className='h-[calc(100vh-60px)]'>
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}