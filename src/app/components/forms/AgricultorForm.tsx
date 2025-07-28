"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  agricultorSchema,
  updateAgricultorSchema,
  type AgricultorFormData,
  type UpdateAgricultorFormData,
} from "../../lib/validations"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import type { Agricultor } from "../../types/agricultor"

interface AgricultorFormProps {
  onSubmit: (data: AgricultorFormData | UpdateAgricultorFormData) => void
  initialData?: Agricultor
  isEdit?: boolean
  loading?: boolean
}

export const AgricultorForm = ({ onSubmit, initialData, isEdit = false, loading }: AgricultorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgricultorFormData | UpdateAgricultorFormData>({
    resolver: zodResolver(isEdit ? updateAgricultorSchema : agricultorSchema),
    defaultValues: initialData
      ? {
          fullName: initialData.fullName,
          birthDate: initialData.birthDate ? initialData.birthDate.split("T")[0] : "",
          phone: initialData.phone || "",
          ...(isEdit && { active: initialData.active }),
        }
      : {
          fullName: "",
          cpf: "",
          birthDate: "",
          phone: "",
        },
  })

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? "Editar Agricultor" : "Cadastrar Novo Agricultor"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome Completo"
            placeholder="Digite o nome completo"
            required
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          {!isEdit && (
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              required
              {...register("cpf")}
              error={errors.cpf?.message}
              onChange={(e) => {
                e.target.value = formatCPF(e.target.value)
              }}
              maxLength={14}
            />
          )}

          <Input label="Data de Nascimento" type="date" {...register("birthDate")} error={errors.birthDate?.message} />

          <Input
            label="Telefone"
            placeholder="(00) 00000-0000"
            {...register("phone")}
            error={errors.phone?.message}
            onChange={(e) => {
              e.target.value = formatPhone(e.target.value)
            }}
            maxLength={15}
          />

          {isEdit && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                {...register("active")}
                className="h-4 w-4 text-green-600 border-gray-600 bg-gray-800 rounded focus:ring-green-500"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-200">
                Agricultor Ativo
              </label>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Salvando..." : isEdit ? "Atualizar" : "Cadastrar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
