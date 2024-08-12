import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
      <html lang="en">
        <body>
          <div className="bg-white h-12 flex items-center p-2 text-black border-black border-1 shadow-md font-bold fixed bg-cyan-300 z-50 mb-8" style={{borderRadius:'50px'}}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
    </html>
  );
}
