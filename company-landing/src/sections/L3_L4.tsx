"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Zap, Repeat, Layers } from "lucide-react";
import { Section, Container, Heading } from "../design-system/components";

/**
 * L3 — Agravação (Stakes)
 */
export function L3_Agravacao() {
  return (
    <Section id="stakes" className="bg-background">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Heading level={2} className="mb-6">
            Quanto custa uma decisão errada da sua IA?
          </Heading>
          <p className="text-xl text-white/50">
            Não é apenas sobre o que você não vende. É sobre a reputação que você destrói toda vez que um lead premium recebe uma resposta errada ou uma promessa vazia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Escala do Erro",
              desc: "A IA escala na mesma velocidade que implementa. Sem governança, você está apenas automatizando a mediocridade em massa.",
              icon: AlertTriangle,
              color: "text-red-500",
            },
            {
              title: "O Custo do Cliente Perdido",
              desc: "No alto ticket, um lead perdido custa meses de faturamento. Um sistema que alucina é um dreno silencioso no seu LTV.",
              icon: Zap,
              color: "text-orange-500",
            },
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[40px] border-white/5 group hover:border-brand-blue/30 transition-colors">
              <item.icon className={item.color + " w-10 h-10 mb-6"} />
              <h3 className="text-2xl font-heading mb-4">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/**
 * L4 — Mecanismo Único (A Grande Ideia)
 */
export function L4_MecanismoUnico() {
  return (
    <Section id="mecanismo" className="relative">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full -z-10" />

      <Container>
        <div className="text-center mb-20">
          <span className="text-brand-blue font-heading tracking-widest text-sm uppercase">O Diferencial Determinístico</span>
          <Heading level={2} className="mt-4">
            Por que 3F3N é a única saída?
          </Heading>
        </div>

        <div className="flex flex-col gap-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1">
                <div className="relative aspect-square glass rounded-[60px] border-white/10 flex items-center justify-center overflow-hidden">
                   {/* Visual representation of RGF */}
                   <div className="relative w-64 h-64">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-brand-blue/30 rounded-full" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-dashed border-brand-blue/50 rounded-full" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-32 h-32 bg-brand-blue rounded-3xl shadow-[0_0_50px_rgba(0,102,255,0.6)] flex items-center justify-center">
                            <ShieldCheck className="w-16 h-16 text-white" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-3xl font-heading flex items-center gap-3">
                      <Repeat className="w-6 h-6 text-brand-blue" /> Recursive Governance Framework
                   </h3>
                   <p className="text-lg text-white/50">
                      Diferente de &quot;prompts mágicos&quot;, o 3F3N é um Sistema Operacional de Agentes. 
                      Ele utiliza camadas de auditoria adversarial onde cada output é validado, scoreado e refinado antes de chegar ao cliente.
                   </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[
                     { title: "Deterministic Flow", icon: Layers, desc: "Sequência imutável de verificação." },
                     { title: "Auto-Refinement", icon: Zap, desc: "A IA que corrige a si mesma." }
                   ].map((feature, i) => (
                     <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                        <feature.icon className="w-6 h-6 text-brand-blue mb-4" />
                        <p className="font-heading mb-1">{feature.title}</p>
                        <p className="text-xs text-white/40">{feature.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
