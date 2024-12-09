import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";

export const metadata = {
    title: "Echoes Within App",
    description: "An emotional journal for tracking mood changes",
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
