"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Section, Container, Heading, Button } from "../design-system/components";

/**
 * L1 — Hero Section (Interrupção)
 */
export function L1_Hero() {
  return (
    <Section id="home" className="min-h-screen flex items-center pt-32 pb-20">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-blue/20 blur-[120px] rounded-full opacity-50" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium border-brand-blue/20">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-white/80 uppercase tracking-widest">3F3N AI OS — v2.0 Operational</span>
          </div>

          <Heading level={1} glow className="max-w-5xl mx-auto leading-[1.1] mb-8">
            Engenharia de Conversão <br />
            <span className="text-brand-blue">Determinística</span> para o seu Negócio
          </Heading>

          <p className="max-w-2xl mx-auto text-xl text-white/60 leading-relaxed mb-12">
            A primeira e única arquitetura de IA OS que se auto-governa para gerar escala de alto ticket com precisão cirúrgica. Sem alucinações. Sem mediocridade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl">
              Implementar Meu AI OS <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              Ver Demonstração
            </Button>
          </div>
        </motion.div>

        {/* Floating cards / visual proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Taxa de Conversão Alvo", value: "≥ 12.4%", desc: "Benchmark 3F3N" },
            { label: "Governança de Automação", value: "Strict", desc: "Zero Alucinação" },
            { label: "Score de Excelência", value: "8.5+", desc: "Validação Mandatória" },
          ].map((item, i) => (
            <div key={i} className="glass p-6 rounded-3xl border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-tighter mb-2">{item.label}</p>
              <h3 className="text-3xl font-heading text-brand-blue mb-1">{item.value}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </Container>
    </Section>
  );
}

/**
 * L2 — Diagnóstico (Empatia)
 */
export function L2_Diagnostico() {
  return (
    <Section id="diagnostico" className="bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-blue font-heading tracking-widest text-sm uppercase">Fase 1: O Diagnóstico</span>
            <Heading level={2} className="mt-4 mb-8">
              O Marketing &apos;Bom o Suficiente&apos; está matando o seu lucro
            </Heading>
            <div className="space-y-6 text-lg text-white/50 leading-relaxed">
              <p>
                Você já percebeu? Automações genéricas, scripts de IA que soam como robôs e funis que desperdiçam leads qualificados.
              </p>
              <p>
                O mercado de alto ticket não aceita a média. Se o seu sistema falha em um detalhe, você perde a confiança do seu cliente mais valioso.
              </p>
            </div>
          </div>
          <div className="relative">
             <div className="glass p-8 rounded-[40px] border-white/10 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                      <ChevronDown className="w-6 h-6 rotate-180" />
                   </div>
                   <div>
                      <p className="font-heading text-xl">The Mediocrity Trap</p>
                      <p className="text-sm text-white/40">Sintomas comuns de sistemas não-3F3N</p>
                   </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Respostas genéricas em canais premium",
                    "Quebra de lógica em fluxos automáticos",
                    "Inconsistência de tom e identidade",
                    "Incapacidade de escalar sem supervisão humana"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
             {/* Decorative glow */}
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
