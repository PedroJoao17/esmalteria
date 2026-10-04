import { ProductCatalog } from "@/components/catalog-browser";
import { Shell } from "@/components/shell";
import { catalogGateway } from "@/services/app-service";

export default async function Products() {
  const products = await catalogGateway.listProducts();
  return <Shell><section className="page-hero"><span className="kicker">Sua rotina de autocuidado</span><h1>Produtos</h1><p>Perfumes, sabonetes e hidratantes em catálogo demonstrativo. No MVP, o interesse é encaminhado pelo WhatsApp.</p></section><section className="section compact"><ProductCatalog items={products} /></section></Shell>;
}
