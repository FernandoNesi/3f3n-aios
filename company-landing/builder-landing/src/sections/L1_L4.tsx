"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, Zap, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { Section, Container, Heading, Button, Terminal } from "../design-system/components";

/**
 * L1 — Hero Section (Interrupção)
 */
export function L1_Hero() {
  return (
    <Section id="home" className="min-h-screen flex flex-col justify-center pt-32 relative">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 blur-[150px] rounded-full" />
      </div>
      
      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-10 text-xs font-bold border-white/5 group hover:border-brand-blue/30 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span className="text-white/60 uppercase tracking-[0.2em]">3F3N OPERATING SYSTEM — v2.0</span>
          </div>

          <div className="mb-12">
            <Terminal lines={[
              "initializing 3f3n validation engine...",
              "✓ neurodesign patterns [online]",
              "✓ conversion architecture [online]",
              "✓ security audit [online]",
              "3F3N VALIDATION OS LIVE"
            ]} />
          </div>

          <Heading level={1} className="max-w-4xl mx-auto mb-8 hero-shimmer">
            Lance sua página com autoridade em 120 minutos
          </Heading>

          <p className="max-w-2xl mx-auto text-xl text-white/40 leading-relaxed mb-12 font-medium">
            O Sistema 3F3N valida cada pixel da sua landing page automaticamente para garantir conversão máxima.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="xl" variant="conic" className="group">
              Agendar Avaliação Gratuita 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center gap-3 text-white/30 text-sm font-semibold uppercase tracking-wider">
               <ShieldCheck className="w-5 h-5 text-brand-blue" /> Seguro
            </div>
          </div>
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
    <Section id="diagnostico" className="bg-black/50 border-y border-white/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">01 // O DIAGNÓSTICO</span>
            <Heading level={2} className="mt-4 mb-8">
              O medo do amadorismo está travando o seu faturamento
            </Heading>
            <p className="text-lg text-white/50 leading-relaxed">
              Você olha para o seu rascunho e sente que algo está errado, mas não sabe o quê. Esse sentimento de incerteza é o que impede você de colocar seu produto no mercado e começar a vender com escala.
            </p>
          </motion.div>
          <div className="glass-dark p-12 rounded-[32px] border-white/5 relative group hover:border-brand-blue/20 transition-all duration-500">
            <div className="absolute -top-6 -right-6 p-6 glass rounded-2xl text-brand-blue/20 group-hover:text-brand-blue/40 transition-colors">
               <AlertTriangle className="w-16 h-16" />
            </div>
            <p className="text-xl italic text-white/80 font-medium leading-relaxed mb-8">
              &quot;Sua página não transmite a autoridade que o seu produto realmente tem.&quot;
            </p>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">AGITAÇÃO DA DOR</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L3 — Agravação (Preço da Inércia)
 */
export function L3_Agravacao() {
  return (
    <Section id="stakes">
      <Container className="text-center">
        <Heading level={2} className="mb-20">O Custo Invisível do Design Amador</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-12 glass-dark rounded-[32px] border-white/5 hover:border-red-500/20 transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500/50 transition-colors" />
            <div className="mb-6 w-12 h-12 glass rounded-xl flex items-center justify-center text-red-500/50 group-hover:text-red-500 transition-colors">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Queda na Confiança</h3>
            <p className="text-white/40 leading-relaxed font-medium">
              O cérebro humano julga a autoridade visual antes mesmo de ler a primeira palavra. Design ruim afasta seu cliente ideal em milissegundos.
            </p>
          </div>
          <div className="p-12 glass-dark rounded-[32px] border-white/5 hover:border-brand-blue/20 transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue/20 group-hover:bg-brand-blue/50 transition-colors" />
            <div className="mb-6 w-12 h-12 glass rounded-xl flex items-center justify-center text-brand-blue/50 group-hover:text-brand-blue transition-colors">
               <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Perda de Autoridade</h3>
            <p className="text-white/40 leading-relaxed font-medium">
              Não é apenas sobre uma venda perdida hoje. É a desvalorização da sua marca perante o mercado que você trabalhou tanto para construir.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L4 — Mecanismo Único (Solução)
 */
export function L4_MecanismoUnico() {
  return (
    <Section id="mecanismo" className="bg-brand-blue/[0.02]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="aspect-square glass-dark rounded-[60px] flex items-center justify-center p-20 border-white/5 relative group hover:border-brand-blue/20 transition-all duration-700">
                <Globe className="w-full h-full text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="px-10 py-5 glass-dark rounded-2xl border-brand-blue/30 text-xl font-bold text-glow-blue">
                      54 Critérios OS
                   </div>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">02 // A INOVAÇÃO</span>
            <Heading level={2} className="mt-4 mb-8">
              Sistema 3F3N de Validação Automática
            </Heading>
            <div className="space-y-6 text-lg text-white/50 leading-relaxed font-medium">
              <p>
                O 3F3N audita cada pixel da sua landing page contra 54 critérios de neurodesign antes de você publicar.
              </p>
              <p>
                Enquanto ferramentas comuns focam em templates, o 3F3N garante que a estrutura psicológica está blindada para converter.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
