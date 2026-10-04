import { ServiceCatalog } from "@/components/catalog-browser";
import { Shell } from "@/components/shell";
import { catalogGateway } from "@/services/app-service";

export default async function Services() {
  const services = await catalogGateway.listServices();
  return <Shell><section className="page-hero"><span className="kicker">Escolha seu cuidado</span><h1>Serviços</h1><p>Busque, filtre e consulte detalhes antes de reservar. Os valores permanecem demonstrativos até a validação comercial.</p></section><section className="section compact"><ServiceCatalog items={services} /></section></Shell>;
}
