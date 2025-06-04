import { NextResponse } from 'next/server';

// Simulated insights data - in a real app, this would come from your AI model
const generateInsights = () => {
  const insights = [
    {
      type: 'recommendation',
      title: 'Oportunidade de Expansão',
      description: 'Análise de uso indica que 5 clientes estão consistentemente atingindo seus limites de uso. Considere uma abordagem proativa para upgrade de plano.',
      impact: 'Alta',
      category: 'Expansão',
      effort: 'Média'
    },
    {
      type: 'trend',
      title: 'Padrão de Uso Identificado',
      description: 'Aumento significativo no uso de APIs de integração nos últimos 15 dias, indicando maior maturidade técnica dos clientes.',
      impact: 'Média',
      category: 'Uso de Produto',
      effort: 'Baixa'
    },
    {
      type: 'risk',
      customer: 'Tech Solutions Inc',
      risk: 'Risco de Churn',
      probability: 68,
      signals: [
        { id: 'signal-1', text: 'Diminuição de 30% no uso da plataforma' },
        { id: 'signal-2', text: 'Aumento em tickets de suporte' },
        { id: 'signal-3', text: 'Feedback negativo recente sobre nova feature' }
      ]
    }
  ];

  return insights;
};

export async function POST() {
  try {
    // Simula um delay para parecer que está processando
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const insights = generateInsights();
    
    return NextResponse.json({ 
      success: true, 
      insights,
      message: 'Novos insights gerados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao gerar insights:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao gerar novos insights'
      },
      { status: 500 }
    );
  }
} 