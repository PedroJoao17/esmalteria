import Link from "next/link";
import { Bag, Calendar, HomeIcon, User } from "./icons";

export function MobileNav() {
  return <nav className="mobile-nav" aria-label="Navegação móvel"><Link href="/"><HomeIcon /><span>Início</span></Link><Link href="/agendar"><Calendar /><span>Agendar</span></Link><Link href="/produtos"><Bag /><span>Produtos</span></Link><Link href="/cliente"><User /><span>Minha área</span></Link></nav>;
}
