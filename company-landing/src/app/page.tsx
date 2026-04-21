import { L1_Hero, L2_Diagnostico } from "@/sections/L1_L2";
import { L3_Agravacao, L4_MecanismoUnico } from "@/sections/L3_L4";
import { L5_ProvaSocial, L6_Autoridade } from "@/sections/L5_L6";
import { L7_Oferta, L8_Objecoes } from "@/sections/L7_L8";
import { L9_Comparacao, L10_Garantia, L11_Urgencia } from "@/sections/L9_L11";
import { L12_CTA, L13_FAQ, L14_Footer } from "@/sections/L12_L14";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 
        3F3N DETERMINISTIC SEQUENCE:
        L1 -> L14 (14 Mandatory Slides)
      */}
      <L1_Hero />
      <L2_Diagnostico />
      <L3_Agravacao />
      <L4_MecanismoUnico />
      <L5_ProvaSocial />
      <L6_Autoridade />
      <L7_Oferta />
      <L8_Objecoes />
      <L9_Comparacao />
      <L10_Garantia />
      <L11_Urgencia />
      <L12_CTA />
      <L13_FAQ />
      <L14_Footer />
    </main>
  );
}
