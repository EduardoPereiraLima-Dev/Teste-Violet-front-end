"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAgricultores } from "../../hooks/useAgricultores"
import { AgricultorForm } from "../../components/forms/AgricultorForm"
import type { AgricultorFormData } from "../../lib/validations"

export default function NovoAgricultorPage() {
  const router = useRouter()
  const { createAgricultor } = useAgricultores()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: AgricultorFormData) => {
    setLoading(true)
    const success = await createAgricultor(data)
    setLoading(false)

    if (success) {
      router.push("/agricultores")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100">Cadastrar Novo Agricultor</h1>
        <p className="text-gray-300 mt-2">Preencha os dados abaixo para cadastrar um novo agricultor</p>
      </div>

      <AgricultorForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
