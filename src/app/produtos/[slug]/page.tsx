import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/icons";
import { Shell } from "@/components/shell";
import { products } from "@/data/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: `${product.name} | Esmalteria`, description: product.description } : {};
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <Shell>
      <section className="detail-page">
        <Link className="back-link" href="/produtos">← Voltar aos produtos</Link>
        <div className="detail-grid">
          <div className={`detail-art product-art ${product.color}`}><span className="bottle"><i /></span></div>
          <div className="detail-content">
            <span className="kicker">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-lead">{product.description}</p>
            <div className="detail-facts">
              <div><small>Valor demonstrativo</small><strong>{product.price}</strong></div>
              <div><small>Disponibilidade</small><strong>{product.availability}</strong></div>
            </div>
            <div className="decision-note">
              <strong>Forma de compra em validação</strong>
              <p>O MVP ainda definirá se os produtos serão vendidos por contato no WhatsApp, reserva para retirada ou compra dentro do sistema.</p>
            </div>
            <div className="detail-actions">
              <span className="button primary is-disabled" aria-disabled="true">Compra ainda não habilitada</span>
              <Link className="button ghost" href="/produtos">Explorar catálogo <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
