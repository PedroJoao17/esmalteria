import Link from "next/link";
import { Shell } from "@/components/shell";

export default function NotFound() {
  return <Shell><section className="not-found"><span className="kicker">Página não encontrada</span><h1>Esse caminho não existe.</h1><p>Volte ao início ou explore os serviços disponíveis no MVP.</p><div className="button-row"><Link className="button primary" href="/">Ir para o início</Link><Link className="button ghost" href="/servicos">Ver serviços</Link></div></section></Shell>;
}
