# Skill: build-landing-page

## Objective
Construir uma landing page completa baseada em um JSON estruturado no padrão 3F3N (L1–L14).

---

## Input
Um JSON contendo a estrutura:

- laminas.L1 até laminas.L14
- cada lâmina com:
  - titulo
  - copy / headline / sub_headline / cta

---

## Rules

### Estrutura
- Criar uma seção para cada lâmina (L1–L14)
- Respeitar ordem do JSON
- Não remover nenhuma seção
- Não alterar textos

---

### Copy
- Proibido alterar qualquer texto
- Proibido resumir ou reescrever
- Usar exatamente o conteúdo do JSON

---

### Layout
- Mobile-first
- Seções com espaçamento claro (py-16 / py-24)
- Container centralizado (max-w-6xl mx-auto)

---

### Componentes obrigatórios

#### L1 (Hero)
- Headline em destaque (text-4xl ou maior)
- Subheadline abaixo
- Botão CTA grande e visível

#### L5 (Prova)
- Destaque visual (cards ou bloco)
- Depoimento em evidência

#### L10 (Garantia)
- Bloco com fundo diferenciado

#### L12 (CTA)
- Botão grande centralizado
- Alto contraste

---

### Design
- Estilo: moderno, premium, clean
- Tipografia forte (font-semibold / font-bold)
- Evitar visual genérico de template

---

## Stack
- Next.js (App Router)
- TailwindCSS
- Componentização por seção

---

## Output esperado
- Código da página completo
- Componentes organizados
- Pronto para deploy

---

## Critical Constraints
- NÃO inventar conteúdo
- NÃO alterar JSON
- NÃO simplificar estrutura