"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ShieldCheck, Mail, MapPin } from "lucide-react";
import { Section, Container, Heading, Button } from "../design-system/components";

/**
 * L12 — CTA Principal (Conversão)
 */
export function L12_CTA() {
  return (
    <Section id="cta-principal" className="bg-background py-32">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-16 md:p-24 rounded-[80px] border-brand-blue/30 relative overflow-hidden"
        >
          {/* Animated background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/10 to-transparent -z-10" />
          
          <Heading level={2} glow className="mb-8">
            Pronto para o Determinismo?
          </Heading>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Não deixe sua escala de alto ticket ao acaso. Implemente hoje a arquitetura que governa a elite do mercado.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Button size="xl" className="h-24 px-16 text-2xl group">
              Agendar Reunião de Arquitetura <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <p className="flex items-center gap-2 text-white/30 text-sm">
              <ShieldCheck className="w-4 h-4 text-brand-blue" /> Vagas limitadas para o ciclo atual. Resposta em &lt; 2h.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

/**
 * L13 — FAQ (Encerramento)
 */
export function L13_FAQ() {
  const faqs = [
    {
      q: "Como funciona a integração com meu CRM atual?",
      a: "O 3F3N AI OS é agnóstico. Utilizamos webhooks e APIs para nos conectar a qualquer CRM do mercado (Salesforce, HubSpot, RD Station, etc), garantindo que os dados fluam sem fricção entre camadas de governança e seus vendedores."
    },
    {
      q: "Qual o tempo médio de implementação?",
      a: "Um ciclo completo de implementação de Squad leva entre 14 e 21 dias, dependendo da complexidade das camadas de decisão e da quantidade de agentes necessários."
    },
    {
      q: "A propriedade intelectual do código é minha?",
      a: "Sim. Ao final da implementação, toda a infraestrutura e a lógica dos agentes são transferidas para sua propriedade. Você detém o controle total do seu AI OS."
    },
    {
      q: "Quanto suporte recebo após o deploy?",
      a: "Nosso Implementation Squad acompanha você por 30 dias após o deploy para garantir que os scores de excelência sejam mantidos e otimizados."
    }
  ];

  return (
    <Section id="faq" className="bg-neutral-950">
      <Container>
        <div className="text-center mb-20">
          <Heading level={2}>Perguntas Técnicas</Heading>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 glass rounded-3xl border-white/5">
              <h4 className="text-lg font-heading text-white mb-4 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-brand-blue" /> {faq.q}
              </h4>
              <p className="text-white/40 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/**
 * L14 — Footer (Credibilidade Final)
 */
export function L14_Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-heading text-white">3F3N</span>
              <span className="text-brand-blue text-xs tracking-widest uppercase font-bold">AI OS</span>
            </div>
            <p className="text-white/30 text-sm max-w-sm">
              Engineering high-ticket conversion with deterministic AI governance. Transform your business into an automated profit engine.
            </p>
          </div>
          <div>
            <h5 className="text-white font-heading mb-6 uppercase tracking-widest text-xs">Infraestrutura</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li>Governance Layer</li>
              <li>Recursive Optimization</li>
              <li>Adversarial Audit</li>
              <li>Multi-Agent Squads</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-heading mb-6 uppercase tracking-widest text-xs">Contato</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@3f3n.ai</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> São Paulo / Global</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-xs text-white/20">© 2026 3F3N AI OS — Todos os direitos reservados. Deterministic by Design.</p>
          <div className="flex gap-8 text-xs text-white/20">
            <span className="hover:text-brand-blue transition-colors cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-brand-blue transition-colors cursor-pointer">Termos de Uso</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
