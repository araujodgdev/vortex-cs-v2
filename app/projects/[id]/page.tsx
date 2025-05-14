"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, CheckCircle, Clock, FileText, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const [loading, setLoading] = useState(true);

  // Simulação de dados de um projeto específico
  const project = {
    id: projectId,
    name: "Implementação CRM",
    client: "Empresa ABC",
    status: "Em andamento",
    progress: 65,
    description: "Implementação de sistema CRM personalizado com integrações de API e migração de dados existentes.",
    startDate: "01/09/2023",
    dueDate: "15/12/2023",
    team: [
      { name: "Ana Silva", role: "Gerente de Projeto", email: "ana@example.com" },
      { name: "Carlos Mendes", role: "Desenvolvedor", email: "carlos@example.com" },
      { name: "Mariana Costa", role: "Analista de Negócios", email: "mariana@example.com" },
    ],
    milestones: [
      { name: "Levantamento de Requisitos", status: "Concluído", date: "15/09/2023" },
      { name: "Desenvolvimento de Protótipo", status: "Concluído", date: "10/10/2023" },
      { name: "Integração com API", status: "Em andamento", date: "30/11/2023" },
      { name: "Testes e Validação", status: "Pendente", date: "10/12/2023" },
      { name: "Entrega Final", status: "Pendente", date: "15/12/2023" },
    ],
    recentActivities: [
      { type: "update", description: "Atualização de status do projeto", date: "22/11/2023", user: "Ana Silva" },
      { type: "document", description: "Novo documento adicionado: Especificação Técnica v2", date: "20/11/2023", user: "Carlos Mendes" },
      { type: "meeting", description: "Reunião de acompanhamento agendada para 25/11", date: "18/11/2023", user: "Mariana Costa" },
    ],
  };

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Projeto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/projects" 
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para projetos
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
          <p className="text-slate-600 dark:text-slate-400">Cliente: {project.client}</p>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2">
          <span 
            className={`px-3 py-1 text-sm rounded-full inline-flex items-center ${project.status === "Concluído" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}
          >
            <span className="h-2 w-2 rounded-full bg-current mr-2"></span>
            {project.status}
          </span>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium">Prazo:</span> {project.dueDate}
          </div>
        </div>
      </div>

      {/* Progresso do Projeto */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Progresso do Projeto</h2>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso Geral</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-blue-600"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-md font-medium text-slate-900 dark:text-white">Marcos do Projeto</h3>
          <div className="space-y-3">
            {project.milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${milestone.status === "Concluído" 
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" 
                  : milestone.status === "Em andamento" 
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}
                >
                  {milestone.status === "Concluído" && <CheckCircle className="h-4 w-4" />}
                  {milestone.status === "Em andamento" && <Clock className="h-4 w-4" />}
                  {milestone.status === "Pendente" && <span className="h-2 w-2 rounded-full bg-current"></span>}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-medium text-slate-900 dark:text-white">{milestone.name}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{milestone.date}</span>
                  </div>
                  <span className={`text-xs ${milestone.status === "Concluído" 
                    ? "text-green-600 dark:text-green-400" 
                    : milestone.status === "Em andamento" 
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400"}`}
                  >
                    {milestone.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalhes e Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detalhes do Projeto */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Detalhes do Projeto</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-900 dark:text-white">Data de Início:</span>
                <p className="text-slate-600 dark:text-slate-400">{project.startDate}</p>
              </div>
              <div>
                <span className="font-medium text-slate-900 dark:text-white">Data de Conclusão:</span>
                <p className="text-slate-600 dark:text-slate-400">{project.dueDate}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Atividades Recentes</h2>
            
            <div className="space-y-4">
              {project.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ${activity.type === "update" 
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" 
                    : activity.type === "document" 
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                      : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"}`}
                  >
                    {activity.type === "update" && <Clock className="h-4 w-4" />}
                    {activity.type === "document" && <FileText className="h-4 w-4" />}
                    {activity.type === "meeting" && <Calendar className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 dark:text-white">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{activity.user}</span>
                      <span className="text-slate-500 dark:text-slate-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipe e Ações */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Equipe do Projeto</h2>
            </div>
            
            <div className="space-y-4">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Ações Rápidas</h2>
            
            <div className="space-y-3">
              <Link 
                href={`/projects/${projectId}/feedback`}
                className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors w-full text-left"
              >
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-slate-900 dark:text-white">Enviar Feedback</span>
              </Link>
              
              <Link 
                href={`/projects/${projectId}/documents`}
                className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors w-full text-left"
              >
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-slate-900 dark:text-white">Ver Documentos</span>
              </Link>
              
              <Link 
                href={`/projects/${projectId}/meetings`}
                className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors w-full text-left"
              >
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-slate-900 dark:text-white">Agendar Reunião</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}