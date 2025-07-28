import { z } from "zod"

// Validador de CPF
const cpfValidator = (cpf: string): boolean => {
  if (!cpf) return false

  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digit1 = 11 - (sum % 11)
  if (digit1 === 10 || digit1 === 11) digit1 = 0
  if (digit1 !== Number.parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  let digit2 = 11 - (sum % 11)
  if (digit2 === 10 || digit2 === 11) digit2 = 0
  if (digit2 !== Number.parseInt(cpf.charAt(10))) return false

  return true
}

export const agricultorSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório").trim(),
  cpf: z.string().min(1, "CPF é obrigatório").refine(cpfValidator, "CPF inválido"),
  birthDate: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
})

export const updateAgricultorSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório").trim(),
  birthDate: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  active: z.boolean().optional(),
})

export type AgricultorFormData = z.infer<typeof agricultorSchema>
export type UpdateAgricultorFormData = z.infer<typeof updateAgricultorSchema>
