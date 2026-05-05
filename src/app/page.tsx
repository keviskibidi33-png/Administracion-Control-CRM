import { Suspense } from "react"
import { FixedProgramacionEditor } from "@/components/fixed-programacion-editor"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="p-4">Cargando...</div>}>
        <FixedProgramacionEditor
          kind="administracion"
          title="Control Administración"
          subtitle="Gestión administrativa de facturación, cobros y control interno."
          viewMode="ADMIN"
          availableViewModes={["LAB", "ADMIN"]}
          exportMode="administracion"
          storageNamespace="programacion-administracion"
        />
      </Suspense>
    </main>
  )
}
