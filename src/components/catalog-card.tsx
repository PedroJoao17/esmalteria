import Link from "next/link";
import type { Product, Service } from "@/types/catalog";
import { Arrow, Clock } from "./icons";

export function ServiceCard({ item }: { item: Service }) {
  return <article className="service-card"><div className={`service-art ${item.tone}`}><span>{item.symbol}</span></div><div className="card-body"><div className="card-title"><div><small className="card-category">{item.category}</small><h3>{item.name}</h3></div><strong>{item.price}</strong></div><p>{item.description}</p><div className="availability-row"><span className={`availability ${item.availability === "Disponível" ? "available" : "consult"}`}>{item.availability}</span></div><div className="card-meta"><span><Clock /> {item.time}</span><div className="card-actions"><Link href={`/servicos/${item.slug}`}>Detalhes</Link><Link className="mini-action" href={`/agendar?service=${item.slug}`}>Agendar <Arrow /></Link></div></div></div></article>;
}

export function ProductCard({ item }: { item: Product }) {
  const availabilityClass = item.availability === "Disponível" ? "available" : item.availability === "Indisponível" ? "unavailable" : "consult";
  return <article className="product-card"><Link href={`/produtos/${item.slug}`} className="product-link" aria-label={`Ver detalhes de ${item.name}`}><div className={`product-art ${item.color}`}><span className="bottle"><i /></span></div><div><small>{item.category}</small><h3>{item.name}</h3><p className="product-description">{item.description}</p><div className="product-footer"><strong>{item.price}</strong><span className={`availability ${availabilityClass}`}>{item.availability}</span></div></div></Link></article>;
}
