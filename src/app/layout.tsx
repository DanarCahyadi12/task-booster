import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <title>TaskMaster - Your Ultimate To-Do List ✨</title>
      <meta
          name="description"
          content="Organize your tasks efficiently with TaskMaster, the ultimate to-do list app. Manage tasks, set priorities, and stay productive every day."
      />
      <meta
          name="keywords"
          content="to-do list app, task management, productivity, task organizer, daily planner"
      />
      <meta name="author" content="Danar Cahyadi" />
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
