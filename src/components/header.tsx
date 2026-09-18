import Link from "next/link";
import { Sparkle, User } from "./icons";
export function Header(){return <header className="header"><Link className="brand" href="/"><span className="brand-mark"><Sparkle size={18}/></span><span>Esmalteria</span></Link><nav className="desktop-nav" aria-label="Navegação principal"><Link href="/">Início</Link><Link href="/servicos">Serviços</Link><Link href="/produtos">Produtos</Link><Link className="nav-account" href="/cliente"><User size={17}/> Minha área</Link></nav><Link className="mobile-account" href="/cliente" aria-label="Minha área"><User/></Link></header>}
