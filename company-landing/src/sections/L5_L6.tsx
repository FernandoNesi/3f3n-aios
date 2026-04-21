import { Star, TrendingUp, Users, Award, CheckCircle2, Layers, ShieldCheck } from "lucide-react";
import { Section, Container, Heading } from "../design-system/components";

/**
 * L5 — Prova Social (Credibilidade)
 */
export function L5_ProvaSocial() {
  return (
    <Section id="prova-social" className="bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-blue font-heading tracking-widest text-sm uppercase">Impacto Verificável</span>
            <Heading level={2} className="mt-4 mb-8">
              Quem já opera no próximo nível
            </Heading>
            <p className="text-lg text-white/50 mb-12">
              A 3F3N não entrega apenas código; entrega infraestrutura de escala. Nossos sistemas processam decisões de alto ticket em tempo real com governança absoluta.
            </p>

            <div className="space-y-6">
              {[
                { label: "Vendas Geradas via Agentes", value: "R$ 2.4M+", icon: TrendingUp },
                { label: "Score de Satisfação Médio", value: "9.4/10", icon: Star },
                { label: "Taxa de Alucinação Crítica", value: "0.0%", icon: CheckCircle2 },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading text-white">{stat.value}</p>
                    <p className="text-sm text-white/40">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                text: "O mecanismo de auditoria do 3F3N mudou o jogo. Finalmente conseguimos escalar nosso atendimento premium sem medo da IA falar algo errado.",
                author: "CEO, Clínica de Alto Padrão",
              },
              {
                text: "Não é mais sobre prompts. É sobre ter um sistema operacional que garante que cada palavra escrita pela IA está alinhada à nossa marca.",
                author: "Founder, SaaS Premium",
              },
            ].map((quote, i) => (
              <div key={i} className="p-8 glass rounded-[32px] border-white/5 relative">
                <p className="italic text-lg text-white/70 mb-6 underline decoration-brand-blue/30 underline-offset-8">
                  &quot;{quote.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20" />
                  <p className="text-sm font-heading text-white/40">{quote.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * L6 — Autoridade (Credenciais)
 */
export function L6_Autoridade() {
  return (
    <Section id="autoridade">
      <Container>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/3">
             <div className="relative aspect-[3/4] glass rounded-[40px] border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-brand-blue/20">
                   <Users className="w-32 h-32" />
                </div>
                <div className="absolute bottom-10 left-10 z-20">
                   <p className="font-heading text-2xl">3F3N Core Team</p>
                   <p className="text-sm text-white/40">Architects of Conversion</p>
                </div>
             </div>
          </div>
          <div className="w-full lg:w-2/3">
            <span className="text-brand-blue font-heading tracking-widest text-sm uppercase">O Guardião da Excelência</span>
            <Heading level={2} className="mt-4 mb-8">
              Engenharia de Precisão no DNA
            </Heading>
            <div className="space-y-6 text-lg text-white/50 leading-relaxed">
              <p>
                A 3F3N nasceu da obsessão por converter tecnologia em resultado. Não somos uma agência; somos arquitetos de sistemas de inteligência que pensam, agem e validam como os seus melhores especialistas.
              </p>
              <p>
                Nosso compromisso é com a taxa de conversão, não com a &apos;novidade tecnológica&apos;. Cada linha de comando no nosso AI OS existe para um único fim: converter atenção em lucro de alto ticket.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8">
               {[
                 { label: "Decision Layers", icon: Layers },
                 { label: "Strict Governance", icon: ShieldCheck },
                 { label: "Elite Performance", icon: Award }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 text-white/40">
                    <item.icon className="w-5 h-5 text-brand-blue" />
                    <span className="text-sm uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
