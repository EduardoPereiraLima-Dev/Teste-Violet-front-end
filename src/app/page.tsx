import Link from "next/link"
import { Button } from "../app/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../app/components/ui/Card"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Sistema de Gerenciamento de Agricultores</h2>
        <p className="text-lg text-gray-300 mb-8">Gerencie o cadastro de agricultores de forma simples e eficiente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Ver Agricultores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Visualize, pesquise e gerencie todos os agricultores cadastrados</p>
            <Link href="/agricultores">
              <Button className="w-full">Ver Lista</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novo Agricultor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Cadastre um novo agricultor no sistema</p>
            <Link href="/agricultores/novo">
              <Button className="w-full">Cadastrar</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
