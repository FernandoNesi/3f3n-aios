"use client";

import React from "react";
import { Star, Award, TrendingUp, Layers, Check, X, ShieldCheck, HelpCircle } from "lucide-react";
import { Section, Container, Heading, Button } from "../design-system/components";

/**
 * L5 — Prova Social (Credibilidade)
 */
export function L5_ProvaSocial() {
  return (
    <Section id="prova-social" className="bg-black/20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">03 // IMPACTO REAL</span>
            <Heading level={2} className="mt-4 mb-8">
              A Validação que Escala Negócios
            </Heading>
            <p className="text-lg text-white/50 mb-12 font-medium">
              Mais de 1.450 empreendedores lançaram suas páginas sem erros técnicos usando nossa validação. O resultado? Mais confiança na hora do tráfego pago.
            </p>
            
            <div className="flex items-center gap-6 p-8 glass-dark rounded-3xl border-white/5 group hover:border-brand-blue/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-brand-blue" />
              </div>
              <div>
                <p className="text-lg font-bold text-white/90 italic">&quot;Finalmente perdi o medo de mostrar minha página para os clientes. Parece que contratei uma agência de luxo.&quot;</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             {[
               { label: "Páginas Lançadas", val: "1.450+", icon: Award, color: "text-brand-blue" },
               { label: "Score de Conversão", val: "9.1/10", icon: TrendingUp, color: "text-brand-cyan" }
             ].map((stat, i) => (
                <div key={i} className="glass-dark p-10 rounded-3xl border-white/5 text-center group hover:border-white/10 transition-all">
                   <stat.icon className={clsx("w-8 h-8 mx-auto mb-6", stat.color)} />
                   <h3 className="text-4xl font-extrabold mb-1 tracking-tighter">{stat.val}</h3>
                   <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
             ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L6 — Autoridade (DNA 3F3N)
 */
export function L6_Autoridade() {
  return (
    <Section id="autoridade">
      <Container className="text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">04 // NOSSA BASE</span>
          <Heading level={2} className="mt-4 mb-8">Engenharia Sob Medida para o Seu Sucesso</Heading>
          <p className="text-xl text-white/50 leading-relaxed mb-12 font-medium">
            Desenvolvido por especialistas em sistemas de IA e arquitetura de conversão. Nossa filosofia é clara: a tecnologia deve servir à conversão, não ao ego do designer.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <div className="px-8 py-4 glass-dark rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 border-white/5 hover:border-brand-blue/30 transition-colors">
                <ShieldCheck className="w-5 h-5 text-brand-blue" /> Arquitetura Blindada
             </div>
             <div className="px-8 py-4 glass-dark rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 border-white/5 hover:border-brand-blue/30 transition-colors">
                <Layers className="w-5 h-5 text-brand-blue" /> Neurodesign Aplicado
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L7 — A Oferta (Value Stack)
 */
export function L7_Oferta() {
  return (
    <Section id="oferta" className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full -z-10" />
      <Container>
        <div className="max-w-4xl mx-auto glass-dark rounded-[56px] border-white/10 overflow-hidden shadow-3xl">
           <div className="p-14 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                 <ShieldCheck className="w-64 h-64 text-brand-blue" />
              </div>
              
              <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-10 inline-block">Oferta Especial de Lançamento</span>
              <Heading level={2} className="mb-8">Acesso Vitalício ao AI OS Builder</Heading>
              
              <div className="flex flex-col gap-5 text-left max-w-md mx-auto mb-16 relative z-10">
                 <div className="flex items-center gap-4 text-white/70 font-medium">
                    <Check className="w-6 h-6 text-brand-cyan" /> Checklist de Neurodesign
                 </div>
                 <div className="flex items-center gap-4 text-white/70 font-medium">
                    <Check className="w-6 h-6 text-brand-cyan" /> Consultoria de IA Estratégica
                 </div>
              </div>

              <div className="mb-16">
                 <p className="text-white/20 text-xl font-bold line-through mb-2">Valor Total: R$ 4.500</p>
                 <div className="flex items-baseline justify-center gap-3">
                    <span className="text-white/50 text-2xl font-bold">Por apenas</span>
                    <span className="text-6xl md:text-8xl font-black text-glow-blue tracking-tighter">R$ 1.890</span>
                 </div>
                 <p className="text-white/30 text-sm mt-4 font-bold uppercase tracking-widest">ou até 12x no cartão</p>
              </div>

              <Button variant="conic" size="xl" className="w-full md:w-auto px-16 text-lg h-24">
                 Quero Garantir Meu Acesso →
              </Button>
           </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L8 — Objeções (Segurança)
 */
export function L8_Objecoes() {
  return (
    <Section id="faq-lite" className="bg-black/30 border-y border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-12 glass-dark rounded-3xl border-white/5 h-full group hover:border-brand-blue/20 transition-all">
              <HelpCircle className="w-12 h-12 text-brand-blue mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-2xl font-bold mb-4">É seguro e confiável?</h4>
              <p className="text-white/40 font-medium leading-relaxed">Nossa validação segue os padrões do Google e Anthropic de 2026. Sua página já nasce otimizada para os motores de busca e para os critérios de segurança mais recentes.</p>
           </div>
           <div className="p-12 glass-dark rounded-3xl border-white/5 h-full group hover:border-brand-blue/20 transition-all">
              <Layers className="w-12 h-12 text-brand-blue mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-2xl font-bold mb-4">Dificuldade técnica?</h4>
              <p className="text-white/40 font-medium leading-relaxed">O sistema é &apos;no-code&apos;: se você sabe digitar um e-mail, sabe criar sua página. Não exigimos nenhuma habilidade técnica anterior ou conhecimento de programação.</p>
           </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L9 — Comparação (O Abismo)
 */
export function L9_Comparacao() {
  return (
    <Section id="comparacao">
      <Container>
        <div className="text-center mb-20">
           <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase mb-4 block">05 // O ABISMO</span>
           <Heading level={2}>Templates Gerados vs Estrutura Blindada</Heading>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
           {[
             { name: "Neurodesign Aplicado", other: false, f3n: true },
             { name: "Validação Mental Prévia", other: false, f3n: true },
             { name: "Cópia Determinística", other: false, f3n: true },
             { name: "Audit de Conversão", other: false, f3n: true }
           ].map((row, i) => (
             <div key={i} className="flex items-center justify-between p-8 glass-dark rounded-3xl border-white/5 hover:border-white/10 transition-colors">
                <span className="font-bold text-white/80">{row.name}</span>
                <div className="flex items-center gap-16">
                   <div className="text-white/10"><X className="w-6 h-6" /></div>
                   <div className="text-brand-blue text-glow-blue"><Check className="w-8 h-8 stroke-[3]" /></div>
                </div>
             </div>
           ))}
           <p className="text-center text-white/30 mt-12 italic font-medium px-8">
              &quot;Plataformas genéricas te dão templates; o 3F3N te dá uma estrutura blindada contra erros de conversão.&quot;
           </p>
        </div>
      </Container>
    </Section>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(" ");
}
