"use client";

import React from "react";
import { ShieldCheck, Timer, ArrowRight, MessageSquare, Globe, Zap, Award, TrendingUp } from "lucide-react";
import { Section, Container, Heading, Button } from "../design-system/components";

/**
 * L10 — Garantia (Inversão de Risco)
 */
export function L10_Garantia() {
  return (
    <Section id="garantia" className="relative overflow-hidden bg-brand-blue/[0.01]">
      <Container>
        <div className="max-w-4xl mx-auto glass-dark p-16 md:p-24 rounded-[64px] border-white/5 text-center relative group hover:border-brand-blue/20 transition-all duration-1000">
          <ShieldCheck className="absolute -top-10 -left-10 w-64 h-64 text-brand-blue/5 -rotate-12 group-hover:text-brand-blue/10 transition-colors" />
          
          <div className="relative z-10 font-sans">
             <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto mb-10 shadow-[0_0_30px_rgba(16,101,227,0.2)]">
                <ShieldCheck className="w-12 h-12" />
             </div>
             <Heading level={2} className="mb-8">Risco Zero: Garantia Incondicional</Heading>
             <p className="text-xl text-white/50 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
                Se em sua primeira avaliação você não sentir que sua página subiu de nível, devolvemos seu investimento sem perguntas. Garantia incondicional de 30 dias.
             </p>
             <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-blue/10 text-brand-blue font-bold tracking-[0.2em] text-xs border border-brand-blue/20 uppercase">
                PROTEÇÃO TOTAL 3F3N OS
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L11 — Urgência Real (Fricção)
 */
export function L11_Urgencia() {
  return (
    <Section id="urgencia">
      <Container>
        <div className="max-w-5xl mx-auto glass-dark border border-white/5 rounded-[48px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group hover:border-brand-blue/20 transition-all">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <Timer className="w-32 h-32 text-brand-blue" />
          </div>
          <div className="flex-shrink-0 relative">
             <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Timer className="w-10 h-10 animate-pulse" />
             </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-3xl font-bold text-white mb-6">Lançamento em Contagem Regressiva</h3>
            <p className="text-lg text-white/40 leading-relaxed font-medium">
              O preço promocional de lançamento encerra nas próximas 48 horas. Vagas limitadas para o acompanhamento do orquestrador de squads neste mês — apenas 3 novos empreendedores serão atendidos.
            </p>
          </div>
          <div className="flex-shrink-0 text-center md:text-right relative z-10">
             <div className="inline-block glass-dark px-10 py-8 rounded-[32px] border-brand-blue/30 shadow-[0_0_40px_rgba(16,101,227,0.1)]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">OFERTA EXPIRA EM</p>
                <div className="text-6xl font-mono font-black text-white tabular-nums tracking-tighter group-hover:text-brand-blue transition-colors duration-500">48:00:00</div>
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L12 — CTA Principal (Conversão)
 */
export function L12_CTA() {
  return (
    <Section id="cta-final" className="py-40 relative">
       <div className="absolute inset-0 bg-brand-blue/[0.02] pointer-events-none" />
       <Container className="text-center relative z-10">
          <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase block mb-6">06 // PASSO FINAL</span>
          <Heading level={2} className="mb-10 max-w-4xl mx-auto hero-shimmer">
             Sua Nova Página de Alto Padrão Começa Aqui
          </Heading>
          <p className="text-xl text-white/40 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
             Clique abaixo para agendar sua avaliação e validar sua página agora. Transforme seu projeto em um ativo de conversão.
          </p>
          <Button variant="conic" size="xl" className="h-28 px-24 text-2xl group relative">
             <span className="relative z-10 flex items-center">
               Validar Minha Landing Page 
               <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
             </span>
             <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </Button>
       </Container>
    </Section>
  );
}

/**
 * L13 — FAQ (Derrubando Barreira)
 */
export function L13_FAQ() {
  return (
    <Section id="faq" className="bg-black/40 border-t border-white/5">
      <Container>
        <div className="text-center mb-20">
           <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase block mb-4">FAQ</span>
           <Heading level={2}>Ainda com dúvidas?</Heading>
        </div>
        <div className="max-w-3xl mx-auto">
           <div className="p-12 glass-dark rounded-[40px] border-white/5 hover:border-white/10 transition-colors">
              <div className="flex gap-8">
                 <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <MessageSquare className="w-7 h-7" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold mb-6">Preciso saber design?</h4>
                    <p className="text-lg text-white/40 leading-relaxed font-medium">
                       Não. O Sistema 3F3N aplica as regras de neurodesign automaticamente por você. Nossa tecnologia traduz conceitos complexos de psicologia visual em layouts prontos que guiam o olhar do seu cliente.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Ticker — Bloomberg Style Feed
 */
export function Ticker() {
  const items = [
     { label: "AI DISRUPTION INDEX", val: "97.4%", icon: TrendingUp },
     { label: "CONVERSION ENGINE", val: "ACTIVE", icon: Zap },
     { label: "MARKET TRUST", val: "1.45k", icon: Award },
     { label: "GLOBAL UPTIME", val: "99.9%", icon: Globe }
  ];
  
  return (
    <div className="py-6 border-y border-white/5 bg-black/80 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="flex animate-[shimmer_40s_linear_infinite] whitespace-nowrap gap-20 w-fit">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-brand-blue group-hover:animate-ping" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">{item.label}</span>
            <span className="text-sm font-bold text-white/80 mono">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * L14 — Footer (Credibilidade Final)
 */
export function L14_Footer() {
  return (
    <footer className="py-24 border-t border-white/5 bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
           <div className="text-center lg:text-left">
              <div className="text-3xl font-black flex items-center gap-2 mb-6 justify-center lg:justify-start tracking-tighter">
                 <span className="text-white">3F3N</span>
                 <span className="text-brand-blue text-glow-blue">OS</span>
              </div>
              <p className="text-white/20 text-xs font-bold uppercase tracking-widest max-w-xs leading-loose">
                3F3N AI Solutions - Balneário Camboriú, SC.<br />
                Todos os direitos reservados. 2026.
              </p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-10 text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-brand-blue py-1">Privacidade</span>
              <span className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-brand-blue py-1">Termos</span>
              <span className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-brand-blue py-1">Suporte</span>
           </div>

           <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl glass-dark flex items-center justify-center text-white/40 hover:text-brand-blue transition-all group overflow-hidden border-white/5 hover:border-brand-blue/50">
                 <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="w-12 h-12 rounded-2xl glass-dark flex items-center justify-center text-white/40 hover:text-brand-blue transition-all group overflow-hidden border-white/5 hover:border-brand-blue/50">
                 <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
           </div>
        </div>
      </Container>
    </footer>
  );
}
