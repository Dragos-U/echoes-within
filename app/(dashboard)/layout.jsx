import {UserButton} from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function Dashboard({children}) {
    return (
        <div className='h-screen w-screen relative'>
            <SidebarProvider>
                <AppSidebar />
                <div className='w- full h-full'>
                    <header className='h-[60px] border-b border-black/10'>
                        <div className='h-full w-full px-6 flex items-center justify-between'>
                            <SidebarTrigger />
                            <UserButton/>
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