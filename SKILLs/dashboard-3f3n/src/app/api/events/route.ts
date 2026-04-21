import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase usando as variáveis solicitadas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      event_name, 
      page_variation, 
      utm_source, 
      utm_medium, 
      utm_campaign, 
      utm_content 
    } = body;

    // Validar campos obrigatórios
    if (!event_name || !page_variation) {
      return NextResponse.json(
        { error: 'event_name and page_variation are required' },
        { status: 400 }
      );
    }

    // Validação de valores permitidos para event_name
    const allowedEvents = ['page_view', 'cta_click', 'conversion', 'Lead', 'Purchase', 'Schedule'];
    if (!allowedEvents.includes(event_name)) {
      return NextResponse.json(
        { error: `Invalid event_name. Allowed values: ${allowedEvents.join(', ')}` },
        { status: 400 }
      );
    }

    // Inserir na tabela "events" do Supabase
    const { error } = await supabase
      .from('events')
      .insert([
        {
          event_name,
          page_variation,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null
        },
      ]);

    if (error) {
      console.error('Erro ao inserir evento no Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Retorno de sucesso conforme especificado
    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('Erro no endpoint de events:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
