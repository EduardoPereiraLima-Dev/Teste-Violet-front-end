import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cadastro de Agricultores",
  description: "Sistema de gerenciamento de agricultores",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-900">
          <header className="bg-gray-800 shadow-sm border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-100">🌾 Cadastro de Agricultores</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#374151",
              color: "#f3f4f6",
              border: "1px solid #4b5563",
            },
          }}
        />
      </body>
    </html>
  )
}
