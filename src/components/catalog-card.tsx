import { Arrow, Clock } from "./icons";
type Service = {name:string;description:string;price:string;time:string;tone:string;symbol:string};
export function ServiceCard({item}:{item:Service}){return <article className="service-card"><div className={`service-art ${item.tone}`}><span>{item.symbol}</span></div><div className="card-body"><div className="card-title"><h3>{item.name}</h3><strong>{item.price}</strong></div><p>{item.description}</p><div className="card-meta"><span><Clock/> {item.time}</span><button>Agendar <Arrow/></button></div></div></article>}
type Product={name:string;category:string;price:string;color:string};
export function ProductCard({item}:{item:Product}){return <article className="product-card"><div className={`product-art ${item.color}`}><span className="bottle"><i/></span></div><div><small>{item.category}</small><h3>{item.name}</h3><strong>{item.price}</strong></div></article>}
