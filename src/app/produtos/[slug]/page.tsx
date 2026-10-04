import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/icons";
import { Shell } from "@/components/shell";
import { products } from "@/data/catalog";
import { buildWhatsAppUrl, catalogGateway } from "@/services/app-service";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await catalogGateway.getProduct(slug);
  return product ? { title: `${product.name} | Esmalteria`, description: product.description } : {};
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = await catalogGateway.getProduct(slug);
  if (!product) notFound();
  const disabled = product.availability === "Indisponível";
  return <Shell><section className="detail-page"><Link className="back-link" href="/produtos">← Voltar aos produtos</Link><div className="detail-grid"><div className={`detail-art product-art ${product.color}`}><span className="bottle"><i /></span></div><div className="detail-content"><span className="kicker">{product.category}</span><h1>{product.name}</h1><p className="detail-lead">{product.description}</p><div className="detail-facts"><div><small>Valor demonstrativo</small><strong>{product.price}</strong></div><div><small>Disponibilidade</small><strong>{product.availability}</strong></div></div><div className="decision-note"><strong>Modelo do MVP: catálogo + WhatsApp</strong><p>A compra, pagamento e controle de pedidos ficam fora deste primeiro frontend. A cliente manifesta interesse e combina disponibilidade/retirada pelo WhatsApp.</p></div><div className="detail-actions">{disabled ? <span className="button primary is-disabled" aria-disabled="true">Produto indisponível</span> : <a className="button primary" href={buildWhatsAppUrl(product.name)} target="_blank" rel="noreferrer">Consultar no WhatsApp <Arrow /></a>}<Link className="button ghost" href="/produtos">Explorar catálogo</Link></div></div></div></section></Shell>;
}
