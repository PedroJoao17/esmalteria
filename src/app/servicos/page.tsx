import { ServiceCatalog } from "@/components/catalog-browser";
import { Shell } from "@/components/shell";
import { services } from "@/data/catalog";

export default function Services() {
  return (
    <Shell>
      <section className="page-hero">
        <span className="kicker">Escolha seu cuidado</span>
        <h1>Serviços</h1>
        <p>Encontre o ritual ideal para você. Os valores e horários abaixo são demonstrativos enquanto os dados reais são validados.</p>
      </section>
      <section className="section compact">
        <ServiceCatalog items={services} />
      </section>
    </Shell>
  );
}
