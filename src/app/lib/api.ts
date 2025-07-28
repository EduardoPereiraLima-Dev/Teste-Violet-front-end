import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos de timeout
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data
    let detailedErrorData: string | object | undefined = errorData

    // Tenta stringificar se for um objeto vazio ou um objeto complexo sem uma propriedade 'message'
    if (typeof errorData === "object" && errorData !== null) {
      if (Object.keys(errorData).length === 0) {
        detailedErrorData = "{} (empty object)"
      } else if (!errorData.message && JSON.stringify(errorData) !== "{}") {
        // Se for um objeto mas sem a propriedade 'message', stringifica para melhor log
        detailedErrorData = JSON.stringify(errorData)
      }
    } else if (errorData === undefined || errorData === null) {
      detailedErrorData = "No response data"
    }

    // Log detalhado do erro
    console.error("API Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      // Garante que 'data' seja sempre uma string para o log, se for um objeto
      data:
        typeof detailedErrorData === "object" && detailedErrorData !== null
          ? JSON.stringify(detailedErrorData)
          : detailedErrorData,
      url: error.config?.url,
      method: error.config?.method,
    })

    // Tratamento específico para diferentes tipos de erro
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout")
    } else if (error.response?.status === 500) {
      console.error("Internal server error")
    } else if (error.response?.status === 404) {
      console.error("Resource not found")
    }

    return Promise.reject(error)
  },
)

export default api
