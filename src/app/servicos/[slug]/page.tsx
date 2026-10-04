import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Clock } from "@/components/icons";
import { Shell } from "@/components/shell";
import { services } from "@/data/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service ? { title: `${service.name} | Esmalteria`, description: service.description } : {};
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <Shell>
      <section className="detail-page">
        <Link className="back-link" href="/servicos">← Voltar aos serviços</Link>
        <div className="detail-grid">
          <div className={`detail-art service-art ${service.tone}`}><span>{service.symbol}</span></div>
          <div className="detail-content">
            <span className="kicker">{service.category}</span>
            <h1>{service.name}</h1>
            <p className="detail-lead">{service.description}</p>
            <p>{service.details}</p>
            <div className="detail-facts">
              <div><small>Valor demonstrativo</small><strong>{service.price}</strong></div>
              <div><small>Duração estimada</small><strong><Clock /> {service.time}</strong></div>
              <div><small>Disponibilidade</small><strong>{service.availability}</strong></div>
            </div>
            <div className="detail-actions">
              <span className="button primary is-disabled" aria-disabled="true">Agendamento na Sprint 3</span>
              <Link className="button ghost" href="/servicos">Escolher outro serviço <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
