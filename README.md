# Plataforma de Customer Success (CS) com Inteligência Artificial

## 1. Visão Geral do Projeto

Este projeto visa desenvolver uma plataforma robusta e centralizada para a área de Customer Success (CS) da FH. O objetivo principal é otimizar a gestão do relacionamento com clientes B2B, consolidando interações, feedback, avaliações de satisfação (NPS, CSAT, MHS) e o acompanhamento transparente do progresso de projetos. A plataforma será enriquecida com recursos de Inteligência Artificial (IA) para fornecer insights valiosos sobre os clientes, prever a probabilidade de churn, e se integrará com ferramentas como Power BI para análises avançadas e Jira para sincronização de status de projetos.

## 2. Personas (Público-Alvo)

* **Profissional de CS da FH:** Responsável por monitorar a satisfação dos clientes, aplicar avaliações, gerenciar o relacionamento e garantir uma comunicação efetiva.
* **Cliente B2B:** Empresas que contratam os serviços da FH e necessitam acompanhar o andamento de seus projetos, fornecer feedback e acessar documentações.
* **Gerente de Projetos:** Utiliza a plataforma para manter a transparência nas entregas, comunicar-se com os clientes e visualizar feedbacks para ajustes de rota.

## 3. Funcionalidades Principais

A plataforma oferecerá um conjunto de funcionalidades essenciais para a gestão de CS:

* **Gestão de Autenticação e Níveis de Acesso (com Clerk):**
    * Login seguro para clientes e equipe interna utilizando Clerk.
    * Diferentes níveis de permissão e papéis (ex: CS, Cliente, Gerente de Projeto) gerenciados através do Clerk e/ou lógica no Convex.
* **Gerenciamento de Clientes e Projetos (CRUD):**
    * Cadastro e edição de informações de clientes B2B.
    * Criação, acompanhamento e gerenciamento de múltiplos projetos por cliente.
* **Dashboard de Status de Projetos:**
    * Visualização centralizada do andamento de todos os projetos.
    * Indicadores visuais (gráficos) de progresso.
    * Filtros e ordenação para fácil navegação.
* **Sistema de Avaliações de Satisfação:**
    * Criação e envio de formulários de avaliação (NPS, CSAT, MHS).
    * Armazenamento organizado das respostas no banco de dados Convex.
    * Visualização de histórico e resultados consolidados por cliente e projeto.
* **Coleta e Gestão de Feedback:**
    * Interface para clientes registrarem feedbacks de forma estruturada ou não estruturada.
    * Painel para a equipe de CS visualizar, categorizar, priorizar e responder aos feedbacks.
* **Módulo de Comunicação e Compartilhamento de Documentos (com Convex):**
    * Canal de comunicação (chat/feed) para interações rápidas, utilizando as capacidades real-time do Convex.
    * Armazenamento e compartilhamento seguro de documentos relevantes aos projetos, utilizando o file storage do Convex.
* **Logs de Atividades e Acordos:**
    * Registro estruturado de interações chave, decisões, acordos e atas de reunião.
    * Histórico de atividades por projeto e cliente.
* **Sistema de Notificações:**
    * Alertas via e-mail (e potencialmente WhatsApp) sobre eventos importantes (ex: novo feedback, atualização de projeto, avaliação pendente).
* **Sistema de Status de Projeto Aprimorado:**
    * Definição de estágios e sub-status detalhados.
    * Linhas do tempo visuais e alertas para gargalos.

## 4. Recursos de Inteligência Artificial (IA)

A IA será integrada para agregar valor e inteligência à plataforma:

* **IA Conversacional com Insights sobre o Cliente:**
    * **Análise de Sentimento:** Processamento de linguagem natural (NLP) para analisar textos de feedbacks, comunicações e avaliações, classificando o sentimento (positivo, negativo, neutro).
    * **Extração de Tópicos Chave:** Identificação automática dos principais temas e problemas mencionados pelos clientes.
    * **Sumarização:** Geração de resumos de longas conversas ou múltiplos feedbacks.
* **Scores de Predição de Churn:**
    * Modelo de Machine Learning (ML) para calcular a probabilidade de um cliente cancelar o serviço.
    * Utiliza dados históricos e features como engajamento, satisfação (NPS/CSAT), frequência de problemas, e interações para prever riscos.
    * Alertas para a equipe de CS sobre clientes com alto risco de churn, permitindo ações proativas.

## 5. Integrações

* **Jira:** Integração para sincronização automática do status das tarefas e projetos, garantindo que a plataforma reflita o progresso real do desenvolvimento/entrega.
* **Power BI:** Conexão com o banco de dados Convex (via exportação de dados ou APIs, se aplicável) para permitir análises de dados avançadas, criação de dashboards personalizados e relatórios gerenciais pela equipe da FH.
* **WhatsApp Business API (Potencial):** Para envio de notificações e comunicação direta (requer configuração e custos associados à API).
* **Provedores de Email Transacional (ex: SendGrid, Resend):** Para o envio de notificações por email.
* **Clerk:** Para gerenciamento de autenticação e usuários.

## 6. Stack Tecnológica Principal

* **Frontend:** React.js com TypeScript, TailwindCSS para estilização.
* **Autenticação:** Clerk.
* **Backend & Banco de Dados:** Convex (plataforma de backend full-stack com banco de dados reativo integrado, funções serverless TypeScript/JavaScript, armazenamento de arquivos e funcionalidades em tempo real).
* **Serviços de IA/ML:** Python (com Flask/FastAPI) para os microserviços de IA, utilizando bibliotecas como scikit-learn, Pandas, e integração com APIs de LLMs (OpenAI, Google Gemini) ou modelos open-source (Hugging Face).
* **Deployment:** Vercel para o frontend; Convex gerencia seu próprio deployment para o backend.

## 7. API para Consulta

* A plataforma disponibilizará uma API através das funções de backend do Convex (query e mutation functions).
* Estas funções permitirão que sistemas externos ou outras partes da aplicação consultem e manipulem dados de clientes, projetos, avaliações, insights de IA, etc., de forma segura e controlada, respeitando as regras de autenticação e autorização definidas com Clerk e Convex.

---

## Executando o Projeto

# Pela IDE (Local)
* Abra a IDE de preferência
* Clone o repositório com: git clone https://github.com/araujodgdev/vortex-cs-v2
* Abra o terminal e baixe as dependências: npm install
* Rode o projeto: npm run dev

# Pelo Link Vercel
* Abra o link do projeto com deploy do Vercel: [Link aqui]
