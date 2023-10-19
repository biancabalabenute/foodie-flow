import { Inter } from 'next/font/google'
import './globals.scss'
const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
