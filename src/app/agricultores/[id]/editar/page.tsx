"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAgricultores } from "../../../hooks/useAgricultores"
import { AgricultorForm } from "../../../components/forms/AgricultorForm"
import type { Agricultor } from "../../../types/agricultor"
import type { UpdateAgricultorFormData } from "../../../lib/validations"
import { Button } from "../../../components/ui/Button"
import Link from "next/link"

export default function EditarAgricultorPage() {
  const params = useParams()
  const router = useRouter()
  const { getAgricultor, updateAgricultor } = useAgricultores()
  const [agricultor, setAgricultor] = useState<Agricultor | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      loadAgricultor()
    } else {
      setError("ID do agricultor não fornecido")
      setLoadingData(false)
    }
  }, [params.id])

  const loadAgricultor = async () => {
    try {
      setLoadingData(true)
      setError(null)

      const id = Array.isArray(params.id) ? params.id[0] : params.id

      if (!id) {
        setError("ID do agricultor inválido")
        return
      }

      const data = await getAgricultor(id)
      if (data) {
        setAgricultor(data)
      } else {
        setError("Agricultor não encontrado ou ID inválido.")
      }
    } catch (err) {
      console.error("Erro ao carregar agricultor:", err)
      setError("Erro ao carregar dados do agricultor")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (data: UpdateAgricultorFormData) => {
    if (!agricultor) return

    setLoading(true)
    const success = await updateAgricultor(agricultor._id, data)
    setLoading(false)

    if (success) {
      router.push(`/agricultores/${agricultor._id}`)
    }
  }

  if (loadingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Erro</h2>
        <p className="text-gray-300 mb-4">{error}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={loadAgricultor}>Tentar Novamente</Button>
          <Link href="/agricultores">
            <Button variant="outline">Voltar para Lista</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!agricultor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Agricultor não encontrado</h2>
        <p className="text-gray-300 mb-4">O agricultor solicitado não existe ou foi removido.</p>
        <Link href="/agricultores">
          <Button>Voltar para Lista</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100">Editar Agricultor</h1>
        <p className="text-gray-300 mt-2">Atualize os dados do agricultor {agricultor.fullName}</p>
      </div>

      <AgricultorForm onSubmit={handleSubmit} initialData={agricultor} isEdit={true} loading={loading} />
    </div>
  )
}
