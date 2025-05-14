"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Calendar, CheckCircle, Clock, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulação de dados de projetos
  const projects = [
    {
      id: 1,
      name: "Implementação CRM",
      client: "Empresa ABC",
      status: "Em andamento",
      progress: 65,
      nextMilestone: "Integração com API",
      dueDate: "15/12/2023",
    },
    {
      id: 2,
      name: "Migração de Dados",
      client: "Corporação XYZ",
      status: "Em andamento",
      progress: 40,
      nextMilestone: "Validação de Dados",
      dueDate: "22/12/2023",
    },
    {
      id: 3,
      name: "Desenvolvimento Portal",
      client: "Grupo 123",
      status: "Concluído",
      progress: 100,
      nextMilestone: "N/A",
      dueDate: "05/11/2023",
    },
  ];

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Vortex CS</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {user?.firstName} {user?.lastName}
              </span>
              <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                {user?.imageUrl && (
                  <img 
                    src={user.imageUrl} 
                    alt="Avatar" 
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Seus Projetos</h2>
          <p className="text-slate-600 dark:text-slate-400">Acompanhe o progresso dos seus projetos</p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.name}</h3>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${project.status === "Concluído" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}
                  >
                    {project.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span className="font-medium">Cliente:</span> {project.client}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${project.status === "Concluído" ? "bg-green-500" : "bg-blue-500"}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Próximo marco: {project.nextMilestone}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Data prevista: {project.dueDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Ver detalhes
                  </Link>
                  <Link 
                    href={`/projects/${project.id}/feedback`}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    Enviar feedback
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Acesso Rápido</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/projects/meetings"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Reuniões</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Agendar ou visualizar</p>
              </div>
            </Link>
            
            <Link 
              href="/projects/documents"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Documentos</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Acessar documentação</p>
              </div>
            </Link>
            
            <Link 
              href="/projects/team"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Equipe</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Contatos do projeto</p>
              </div>
            </Link>
            
            <Link 
              href="/projects/analytics"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Análises</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Métricas e relatórios</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}