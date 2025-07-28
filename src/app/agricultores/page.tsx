"use client"

import { useEffect, useState } from "react"
import { useAgricultores } from "../hooks/useAgricultores"
import { AgricultorTable } from "../components/tables/AgricultorTable"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default function AgricultoresPage() {
  const { agricultores, loading, pagination, fetchAgricultores, deleteAgricultor, deactivateAndDeleteAgricultor } =
    useAgricultores()
  const [filters, setFilters] = useState({
    fullName: "",
    cpf: "",
    active: undefined as boolean | undefined,
  })

  useEffect(() => {
    fetchAgricultores()
  }, [])

  const handleSearch = () => {
    const queryParams = {
      page: 1,
      limit: 10,
      ...(filters.fullName && { fullName: filters.fullName }),
      ...(filters.cpf && { cpf: filters.cpf }),
      ...(filters.active !== undefined && { active: filters.active }),
    }
    fetchAgricultores(queryParams)
  }

  const handleClearFilters = () => {
    setFilters({ fullName: "", cpf: "", active: undefined })
    fetchAgricultores()
  }

  const handlePageChange = (page: number) => {
    fetchAgricultores({ ...filters, page })
  }

  const handleDeleteAgricultor = async (id: string) => {
    const success = await deleteAgricultor(id)
    if (success) {
      // Recarregar a lista após exclusão
      fetchAgricultores({ ...filters, page: pagination.page })
    }
    return success
  }

  const handleDeactivateAndDeleteAgricultor = async (id: string) => {
    const success = await deactivateAndDeleteAgricultor(id)
    if (success) {
      // Recarregar a lista após exclusão
      fetchAgricultores({ ...filters, page: pagination.page })
    }
    return success
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Agricultores</h1>
        <Link href="/agricultores/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Agricultor
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Nome"
              placeholder="Buscar por nome"
              value={filters.fullName}
              onChange={(e) => setFilters({ ...filters, fullName: e.target.value })}
            />
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              value={filters.cpf}
              onChange={(e) => setFilters({ ...filters, cpf: e.target.value })}
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-200">Status</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filters.active === undefined ? "" : filters.active.toString()}
                onChange={(e) => {
                  const value = e.target.value
                  setFilters({
                    ...filters,
                    active: value === "" ? undefined : value === "true",
                  })
                }}
              >
                <option value="">Todos</option>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <AgricultorTable
            agricultores={agricultores}
            onDelete={handleDeleteAgricultor}
            onDeactivateAndDelete={handleDeactivateAndDeleteAgricultor}
            loading={loading}
          />
        </CardContent>
      </Card>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {pagination.page} de {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
