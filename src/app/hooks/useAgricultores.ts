"use client"

import { useState } from "react"
import api from "../lib/api"
import type {
  Agricultor,
  CreateAgricultorDto,
  UpdateAgricultorDto,
  QueryParams,
  PaginatedResponse,
} from "../types/agricultor"
import toast from "react-hot-toast"

export const useAgricultores = () => {
  const [agricultores, setAgricultores] = useState<Agricultor[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })

  // Função auxiliar para extrair mensagem de erro
  const getErrorMessage = (error: any, defaultMessage: string): string => {
    const apiResponseData = error.response?.data
    let errorMessage = defaultMessage

    if (apiResponseData) {
      if (typeof apiResponseData === "string") {
        errorMessage = apiResponseData // Se a API retornar uma string simples
      } else if (typeof apiResponseData === "object" && apiResponseData !== null) {
        if (apiResponseData.message) {
          errorMessage = apiResponseData.message // Usa a propriedade 'message' se existir
        } else if (Object.keys(apiResponseData).length > 0) {
          // Se for um objeto mas sem 'message', tenta stringificar para mais detalhes
          errorMessage = JSON.stringify(apiResponseData)
        } else {
          errorMessage = "Resposta de erro vazia da API" // Para objetos vazios {}
        }
      }
    }
    return Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
  }

  const fetchAgricultores = async (params?: QueryParams) => {
    setLoading(true)
    try {
      const response = await api.get<PaginatedResponse<Agricultor>>("/agricultores", { params })
      setAgricultores(response.data.data)
      setPagination(response.data.pagination)
    } catch (error: any) {
      console.error("Erro ao carregar agricultores:", error)
      toast.error(getErrorMessage(error, "Erro ao carregar agricultores"))
    } finally {
      setLoading(false)
    }
  }

  const createAgricultor = async (data: CreateAgricultorDto) => {
    try {
      console.log("Criando agricultor:", data)
      await api.post("/agricultores", data)
      toast.success("Agricultor cadastrado com sucesso!")
      return true
    } catch (error: any) {
      console.error("Erro ao criar agricultor:", error)
      toast.error(getErrorMessage(error, "Erro ao cadastrar agricultor"))
      return false
    }
  }

  const updateAgricultor = async (id: string, data: UpdateAgricultorDto) => {
    try {
      console.log("Atualizando agricultor:", id, data)
      await api.patch(`/agricultores/${id}`, data)
      toast.success("Agricultor atualizado com sucesso!")
      return true
    } catch (error: any) {
      console.error("Erro ao atualizar agricultor:", error)
      toast.error(getErrorMessage(error, "Erro ao atualizar agricultor"))
      return false
    }
  }

  const deleteAgricultor = async (id: string) => {
    try {
      console.log("Excluindo agricultor:", id)
      await api.delete(`/agricultores/${id}`)
      toast.success("Agricultor excluído com sucesso!")

      // Atualizar a lista local removendo o item excluído
      setAgricultores((prev) => prev.filter((agricultor) => agricultor._id !== id))

      return true
    } catch (error: any) {
      console.error("Erro ao excluir agricultor:", error)
      toast.error(getErrorMessage(error, "Erro ao excluir agricultor"))
      return false
    }
  }

  const deactivateAndDeleteAgricultor = async (id: string) => {
    try {
      console.log("Desativando e excluindo agricultor:", id)

      // Primeiro, desativar o agricultor
      await api.patch(`/agricultores/${id}`, { active: false })
      console.log("Agricultor desativado, agora excluindo...")

      // Depois, excluir o agricultor
      await api.delete(`/agricultores/${id}`)

      toast.success("Agricultor desativado e excluído com sucesso!")

      // Atualizar a lista local removendo o item excluído
      setAgricultores((prev) => prev.filter((agricultor) => agricultor._id !== id))

      return true
    } catch (error: any) {
      console.error("Erro ao desativar e excluir agricultor:", error)
      toast.error(getErrorMessage(error, "Erro ao excluir agricultor"))
      return false
    }
  }

  const getAgricultor = async (id: string): Promise<Agricultor | null> => {
    try {
      // Validar se o ID é válido
      if (!id || id === "undefined" || id === "null" || id === "novo") {
        console.error("ID inválido fornecido:", id)
        toast.error("ID do agricultor inválido")
        return null
      }

      console.log("Buscando agricultor com ID:", id)
      const response = await api.get<Agricultor>(`/agricultores/${id}`)
      console.log("Agricultor encontrado:", response.data)
      return response.data
    } catch (error: any) {
      console.error("Erro ao carregar agricultor:", error)

      if (error.response?.status === 404) {
        toast.error("Agricultor não encontrado")
      } else if (error.response?.status === 500) {
        toast.error("Erro interno do servidor. Tente novamente.")
      } else {
        toast.error(getErrorMessage(error, "Erro ao carregar agricultor"))
      }
      return null
    }
  }

  return {
    agricultores,
    loading,
    pagination,
    fetchAgricultores,
    createAgricultor,
    updateAgricultor,
    deleteAgricultor,
    deactivateAndDeleteAgricultor,
    getAgricultor,
  }
}
