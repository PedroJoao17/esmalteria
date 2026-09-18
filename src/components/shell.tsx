import { Header } from "./header"; import { MobileNav } from "./mobile-nav";
export function Shell({children}:{children:React.ReactNode}){return <><Header/><main>{children}</main><footer><div><strong>Esmalteria</strong><p>Beleza, cuidado e personalidade em cada detalhe.</p></div><p>Protótipo de experiência • MVP frontend</p></footer><MobileNav/></>}
