import { ProductCatalog } from "@/components/catalog-browser";
import { Shell } from "@/components/shell";
import { products } from "@/data/catalog";

export default function Products() {
  return (
    <Shell>
      <section className="page-hero">
        <span className="kicker">Sua rotina de autocuidado</span>
        <h1>Produtos</h1>
        <p>Perfumes, sabonetes e hidratantes em catálogo demonstrativo. A forma de compra ainda será definida para o MVP.</p>
      </section>
      <section className="section compact">
        <ProductCatalog items={products} />
      </section>
    </Shell>
  );
}
