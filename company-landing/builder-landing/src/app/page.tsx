import { L1_Hero, L2_Diagnostico, L3_Agravacao, L4_MecanismoUnico } from "@/sections/L1_L4";
import { L5_ProvaSocial, L6_Autoridade, L7_Oferta, L8_Objecoes, L9_Comparacao } from "@/sections/L5_L9";
import { L10_Garantia, L11_Urgencia, L12_CTA, L13_FAQ, L14_Footer, Ticker } from "@/sections/L10_L14";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 
         3F3N DETERMINISTIC SEQUENCE (L1-L14) 
      */}
      <L1_Hero />
      <L2_Diagnostico />
      <L3_Agravacao />
      <L4_MecanismoUnico />
      <L5_ProvaSocial />
      <L6_Autoridade />
      <Ticker />
      <L7_Oferta />
      <L8_Objecoes />
      <L9_Comparacao />
      <L10_Garantia />
      <Ticker />
      <L11_Urgencia />
      <L12_CTA />
      <L13_FAQ />
      <L14_Footer />
    </main>
  );
}
