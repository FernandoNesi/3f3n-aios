import React from "react";
import { Check, Plus, HelpCircle, ShieldCheck, Zap, Layers, Globe } from "lucide-react";
import { Section, Container, Heading, Button } from "../design-system/components";

/**
 * L7 — A Oferta (Value Stack)
 */
export function L7_Oferta() {
  const items = [
    { name: "Implementação Full-Stack do AI OS", value: "R$ 25.000" },
    { name: "Arquitetura de 14 Lâminas (Copy + Design)", value: "R$ 10.000" },
    { name: "Squad de Governança Adversarial (30 dias)", value: "R$ 5.000" },
    { name: "Dashboard de Trajetória & Analytics", value: "R$ 5.000" },
  ];

  const bonus = [
    "Auditoria de Blindagem de Infraestrutura",
    "Monitoramento Ativo contra Alucinações",
    "Agente Especialista Dedicado 24/7",
  ];

  return (
    <Section id="oferta" className="bg-background relative">
      {/* Visual background anchor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="text-center mb-16">
          <span className="text-brand-blue font-heading tracking-widest text-sm uppercase">Pilha de Valor Irresistível</span>
          <Heading level={2} className="mt-4">Seu Escudo de Conversão Permanente</Heading>
        </div>

        <div className="max-w-4xl mx-auto glass rounded-[48px] border-white/10 overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 lg:p-16">
            <h3 className="text-3xl font-heading mb-10 text-white/90">3F3N Execution Squad</h3>
            
            <div className="space-y-4 mb-12">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-brand-blue" />
                    <span className="text-white/60">{item.name}</span>
                  </div>
                  <span className="text-white/30 font-mono text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-brand-blue/5 rounded-3xl p-8 mb-12 border border-brand-blue/10">
              <p className="text-brand-blue font-heading uppercase tracking-tighter text-sm mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Bônus Exclusivos de Lançamento
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bonus.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <div>
                <p className="text-white/30 text-sm line-through mb-1">Valor Total: R$ 45.000</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-2xl font-heading">12x</span>
                  <Heading level={2} glow className="text-white">R$ 1.485</Heading>
                  <span className="text-white/40 text-sm">ou R$ 14.800 à vista</span>
                </div>
              </div>
              <Button size="xl" className="w-full md:w-auto h-20 px-12 text-xl">
                Quero Meu Implementation Squad →
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 border-t border-white/10 flex items-center justify-center gap-10">
            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> SSL Secure
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
              <Zap className="w-4 h-4" /> Instant Activation
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L8 — Objeções (FAQ / Antecipação)
 */
export function L8_Objecoes() {
  const qas = [
    {
      q: "É complexo para quem não é técnico?",
      a: "Toda a infraestrutura é montada e operada pelo nosso Squad. Você só precisa definir as regras de negócio; nós cuidamos do determinismo da IA.",
      icon: Layers
    },
    {
      q: "A IA não vai falar coisas erradas?",
      a: "O Sistema 3F3N utiliza camadas adversariais. Qualquer resposta da IA passa por um auditor independente antes de ser enviada ao cliente. Zero alucinação em produção.",
      icon: ShieldCheck
    },
    {
      q: "Como isso se diferencia de um GPT customizado?",
      a: "Um GPT é um prompt. O 3F3N é um sistema operacional com governança, versionamento de artefatos e loops de auto-correção recursiva.",
      icon: Globe
    }
  ];

  return (
    <Section id="faq-lite" className="bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <HelpCircle className="w-12 h-12 text-brand-blue mb-6" />
            <Heading level={2} className="mb-6 leading-tight">Derrubando a medocridade</Heading>
            <p className="text-white/40 text-lg">Respostas diretas para quem não aceita nada menos que o padrão de excelência.</p>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {qas.map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xl font-heading text-white">{item.q}</h4>
                </div>
                <p className="text-white/50 leading-relaxed pl-12">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
