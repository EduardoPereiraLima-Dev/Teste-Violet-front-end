"use client"

import { useState } from "react"
import type { Agricultor } from "../../types/agricultor"
import { Button } from "../../components/ui/Button"
import { ConfirmDialog } from "../../components/ui/ConfirmDialog"
import { Edit, Trash2, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AgricultorTableProps {
  agricultores: Agricultor[]
  onDelete: (id: string) => Promise<boolean>
  onDeactivateAndDelete: (id: string) => Promise<boolean>
  loading?: boolean
}

export const AgricultorTable = ({ agricultores, onDelete, onDeactivateAndDelete, loading }: AgricultorTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    agricultor: Agricultor | null
  }>({
    isOpen: false,
    agricultor: null,
  })

  const handleDeleteClick = (agricultor: Agricultor) => {
    setConfirmDialog({
      isOpen: true,
      agricultor,
    })
  }

  const handleConfirmDelete = async () => {
    if (!confirmDialog.agricultor) return

    setDeletingId(confirmDialog.agricultor._id)

    let success = false
    if (confirmDialog.agricultor.active) {
      // Se ativo, desativar primeiro e depois excluir
      success = await onDeactivateAndDelete(confirmDialog.agricultor._id)
    } else {
      // Se inativo, excluir diretamente
      success = await onDelete(confirmDialog.agricultor._id)
    }

    setDeletingId(null)

    setConfirmDialog({
      isOpen: false,
      agricultor: null,
    })
  }

  const handleCloseDialog = () => {
    if (deletingId) return // Não permitir fechar durante exclusão

    setConfirmDialog({
      isOpen: false,
      agricultor: null,
    })
  }

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const getConfirmMessage = (agricultor: Agricultor) => {
    const baseInfo = `Nome: ${agricultor.fullName}\nCPF: ${formatCPF(agricultor.cpf)}`

    if (agricultor.active) {
      return `⚠️ ATENÇÃO: Este agricultor está ATIVO!\n\n${baseInfo}\n\nO sistema irá:\n1. Desativar o agricultor automaticamente\n2. Excluir o registro em seguida\n\nEsta ação não pode ser desfeita.\n\nTem certeza que deseja continuar?`
    }

    return `${baseInfo}\n\nEsta ação não pode ser desfeita.\n\nTem certeza que deseja excluir este agricultor?`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (agricultores.length === 0) {
    return <div className="text-center py-8 text-gray-500">Nenhum agricultor encontrado.</div>
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Data Cadastro
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {agricultores.map((agricultor) => (
              <tr key={agricultor._id} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">{agricultor.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{formatCPF(agricultor.cpf)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{agricultor.phone || "-"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      agricultor.active ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                    }`}
                  >
                    {agricultor.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {format(new Date(agricultor.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link href={`/agricultores/${agricultor._id}`}>
                      <Button size="sm" variant="outline" title="Visualizar">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/agricultores/${agricultor._id}/editar`}>
                      <Button size="sm" variant="secondary" title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(agricultor)}
                      disabled={deletingId === agricultor._id}
                      title={agricultor.active ? "Excluir (Agricultor Ativo)" : "Excluir"}
                    >
                      {deletingId === agricultor._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          {agricultor.active && <AlertTriangle className="h-3 w-3 ml-1" />}
                        </>
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Excluir Agricultor"
        message={confirmDialog.agricultor ? getConfirmMessage(confirmDialog.agricultor) : ""}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        variant={confirmDialog.agricultor?.active ? "danger" : "warning"}
        isLoading={!!deletingId}
      />
    </>
  )
}
