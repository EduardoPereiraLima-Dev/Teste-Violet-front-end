export interface Agricultor {
  _id: string
  fullName: string
  cpf: string
  birthDate?: string
  phone?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAgricultorDto {
  fullName: string
  cpf: string
  birthDate?: string
  phone?: string
}

export interface UpdateAgricultorDto {
  fullName?: string
  birthDate?: string
  phone?: string
  active?: boolean
}

export interface QueryParams {
  page?: number
  limit?: number
  fullName?: string
  cpf?: string
  active?: boolean
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
