"use client";

import React from "react";
import { X, Check, ShieldCheck, Timer, AlertCircle } from "lucide-react";
import { Section, Container, Heading } from "../design-system/components";

/**
 * L9 — Comparação (Contraste)
 */
export function L9_Comparacao() {
  const criteria = [
    { name: "Governança de Output", other: "Inexistente", f3n: "Recursiva & Adversarial" },
    { name: "Risco de Alucinação", other: "Alto / Não-controlado", f3n: "Monitorado (Score ≥ 8.5)" },
    { name: "Isolamento de Dados", other: "Manual / Frágil", f3n: "Nativo (3F3N Architecture)" },
    { name: "Escalabilidade Dev", other: "Scripts isolados", f3n: "Deterministic OS Framework" },
    { name: "Garantia de Conversão", other: "Zero", f3n: "Score de Excelência" },
  ];

  return (
    <Section id="comparacao" className="bg-background">
      <Container>
        <div className="text-center mb-20">
          <Heading level={2}>Prompting vs. 3F3N AI OS</Heading>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto">Enquanto outros tentam &apos;falar com a IA&apos;, nós construímos um sistema de governança que dita as regras para ela.</p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-8 px-6 text-left text-sm uppercase tracking-widest text-white/30 font-heading">Critério</th>
                <th className="py-8 px-6 text-center text-sm uppercase tracking-widest text-white/30 font-heading">IA Genérica / Prompts</th>
                <th className="py-8 px-6 text-center text-sm uppercase tracking-widest text-brand-blue font-heading">3F3N Deterministic OS</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((item, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-6 font-medium text-white/80">{item.name}</td>
                  <td className="py-6 px-6 text-center text-red-500/50 flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> {item.other}
                  </td>
                  <td className="py-6 px-6 text-center text-brand-blue font-bold flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> {item.f3n}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L10 — Garantia (Inversão de Risco)
 */
export function L10_Garantia() {
  return (
    <Section id="garantia" className="relative">
      <div className="absolute inset-0 bg-brand-blue/5 -z-10" />
      <Container>
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[64px] border-brand-blue/20 text-center relative overflow-hidden">
          {/* Watermark symbol */}
          <ShieldCheck className="absolute -top-10 -left-10 w-64 h-64 text-brand-blue/5 -rotate-12" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto mb-8">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <Heading level={2} className="mb-8">Nós assumimos a responsabilidade</Heading>
            <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              Se o seu sistema não atingir a <span className="text-white font-bold">Excelência Técnica Documentada</span> (Score ≥ 8.5 em todos os gates de governança) nos primeiros 30 dias de implementação, nós trabalhamos em cada camada até ele chegar lá. Sem custos extras. Sem desculpas.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue/10 text-brand-blue font-heading tracking-widest text-sm border border-brand-blue/20">
              GARANTIA DE PERFORMANCE 30 DIAS
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L11 — Urgência (Fricção)
 */
export function L11_Urgencia() {
  return (
    <Section id="urgencia">
      <Container>
        <div className="max-w-5xl mx-auto bg-red-500/5 border border-red-500/20 rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
             <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <Timer className="w-10 h-10 animate-pulse" />
             </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-3xl font-heading text-red-500 mb-4">Apenas 3 Squads por Ciclo</h3>
            <p className="text-lg text-white/60 leading-relaxed">
              A profundidade da nossa implementação exige atenção total e fidelidade absoluta aos princípios 3F3N. Por isso, limitamos nosso intake a 3 empresas por ciclo de 60 dias. 
            </p>
          </div>
          <div className="flex-shrink-0 text-center md:text-right">
             <div className="inline-block glass px-6 py-4 rounded-3xl border-red-500/10">
                <p className="text-xs uppercase tracking-widest text-white/20 mb-1">Status do Ciclo Atual</p>
                <p className="text-2xl font-heading text-red-500">2/3 Vagas Preenchidas</p>
             </div>
             <p className="mt-4 text-xs text-red-500/50 flex items-center justify-center md:justify-end gap-1">
                <AlertCircle className="w-3 h-3" /> Resta apenas 1 vaga disponível
             </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
