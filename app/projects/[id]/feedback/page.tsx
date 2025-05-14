"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function ProjectFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  
  const [feedbackType, setFeedbackType] = useState("general");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simulação de dados do projeto
  const project = {
    id: projectId,
    name: "Implementação CRM",
    client: "Empresa ABC",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulando envio para API
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Resetar o formulário
      setTimeout(() => {
        setFeedbackText("");
        setRating(0);
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link 
            href={`/projects/${projectId}`} 
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o projeto
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Enviar Feedback</h1>
        <p className="text-slate-600 dark:text-slate-400">Projeto: {project.name}</p>
      </div>

      {/* Formulário de Feedback */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        {submitted ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Feedback Enviado!</h2>
            <p className="text-slate-600 dark:text-slate-400">Obrigado por compartilhar sua opinião. Sua contribuição é muito importante para nós.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Tipo de Feedback */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Tipo de Feedback</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFeedbackType("general")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${feedbackType === "general" 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-2 border-blue-500" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-2 border-transparent"}`}
                >
                  Geral
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("suggestion")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${feedbackType === "suggestion" 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-2 border-blue-500" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-2 border-transparent"}`}
                >
                  Sugestão
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("issue")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${feedbackType === "issue" 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-2 border-blue-500" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-2 border-transparent"}`}
                >
                  Problema
                </button>
              </div>
            </div>

            {/* Avaliação */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Avaliação</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <span className={star <= rating ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}>
                      ★
                    </span>
                  </button>
                ))}
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  {rating > 0 ? `${rating} de 5 estrelas` : "Selecione uma avaliação"}
                </span>
              </div>
            </div>

            {/* Comentário */}
            <div className="mb-6">
              <label htmlFor="feedback" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Seu Feedback</label>
              <textarea
                id="feedback"
                rows={5}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Compartilhe seus comentários, sugestões ou relate problemas..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Botão de Envio */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !feedbackText.trim() || rating === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium ${submitting || !feedbackText.trim() || rating === 0
                  ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"}`}
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Enviar Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}