import Link from "next/link";
import { Shell } from "@/components/shell";
import { Arrow, Sparkle } from "@/components/icons";
import { ProductCard, ServiceCard } from "@/components/catalog-card";
import { catalogGateway } from "@/services/app-service";

export default async function Home() {
  const [services, products] = await Promise.all([catalogGateway.listServices(), catalogGateway.listProducts()]);
  return (
    <Shell>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkle size={16} /> Seu momento de autocuidado</span>
          <h1>Beleza que combina com <em>você.</em></h1>
          <p>Serviços especiais para mãos e pés, agendamento simples pelo celular e uma seleção de produtos para continuar seu ritual em casa.</p>
          <div className="hero-actions"><Link className="button primary" href="/agendar">Agendar horário <Arrow /></Link><Link className="button ghost" href="/produtos">Ver produtos</Link></div>
          <div className="prototype-note"><strong>MVP frontend funcional</strong><span>Os fluxos operam com mocks e persistência local, já preparados para futura API.</span></div>
        </div>
        <div className="hero-visual" aria-label="Composição abstrata inspirada em esmaltes"><span className="polish one"><i /></span><span className="polish two"><i /></span><span className="hero-flower">✦</span><span className="hero-line">cuidado<br />em cada<br /><em>detalhe</em></span></div>
      </section>
      <section className="section"><div className="section-heading"><div><span className="kicker">Feito para você</span><h2>Nossos serviços</h2></div><Link href="/servicos">Ver todos <Arrow /></Link></div><div className="service-grid">{services.slice(0,3).map((item)=><ServiceCard key={item.slug} item={item}/>)}</div></section>
      <section className="section product-section"><div className="section-heading"><div><span className="kicker">Leve o cuidado com você</span><h2>Produtos em destaque</h2></div><Link href="/produtos">Explorar catálogo <Arrow /></Link></div><div className="product-grid">{products.slice(0,3).map((item)=><ProductCard key={item.slug} item={item}/>)}</div></section>
      <section className="cta"><Sparkle /><div><span>Seu horário, do seu jeito</span><h2>Pronta para se cuidar?</h2><p>Escolha o serviço, revise o horário e acompanhe tudo na sua área.</p></div><Link className="button light" href="/agendar">Quero agendar <Arrow /></Link></section>
    </Shell>
  );
}
