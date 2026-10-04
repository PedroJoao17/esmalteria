"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Service } from "@/types/catalog";
import type { Appointment, ClientProfile, Session } from "@/types/app";
import { appointmentStorageAdapter, profileStorageAdapter, sessionStorageAdapter } from "@/lib/app-storage";
import { Bag, Calendar, User } from "./icons";

const demoAppointments: Appointment[] = [
  { id:"admin-1", clientEmail:"marina@demo.local", clientName:"Marina S.", serviceSlug:"manicure-classica", serviceName:"Manicure clássica", date:"2026-10-06", time:"09:00", duration:"50 min", price:"R$ 35", status:"Confirmado", createdAt:"2026-10-01T10:00:00Z" },
  { id:"admin-2", clientEmail:"ana@demo.local", clientName:"Ana P.", serviceSlug:"pedicure-spa", serviceName:"Pedicure spa", date:"2026-10-06", time:"10:30", duration:"70 min", price:"R$ 55", status:"Confirmado", createdAt:"2026-10-01T10:00:00Z" },
  { id:"admin-3", clientEmail:"carla@demo.local", clientName:"Carla M.", serviceSlug:"alongamento-em-gel", serviceName:"Alongamento em gel", date:"2026-10-07", time:"14:00", duration:"2h", price:"R$ 120", status:"Confirmado", createdAt:"2026-10-01T10:00:00Z" },
];
const demoClients: ClientProfile[] = [
  { id:"c1", name:"Marina Souza", email:"marina@demo.local", phone:"(92) 99999-1001", address:{cep:"",street:"",number:"",complement:"",neighborhood:"",city:"Manaus",state:"AM"} },
  { id:"c2", name:"Ana Paula", email:"ana@demo.local", phone:"(92) 99999-1002", address:{cep:"",street:"",number:"",complement:"",neighborhood:"",city:"Manaus",state:"AM"} },
  { id:"c3", name:"Carla Mendes", email:"carla@demo.local", phone:"(92) 99999-1003", address:{cep:"",street:"",number:"",complement:"",neighborhood:"",city:"Manaus",state:"AM"} },
];
type CatalogItem={id:string;type:"service"|"product";name:string;category:string;price:string;available:boolean};

export function AdminDashboard({ services, products }: { services: Service[]; products: Product[] }) {
  const router=useRouter();
  const [session,setSession]=useState<Session|null>(null);
  const [tab,setTab]=useState<"agenda"|"clientes"|"catalogo">("agenda");
  const [appointments,setAppointments]=useState<Appointment[]>(demoAppointments);
  const [dateFilter,setDateFilter]=useState("");
  const [statusFilter,setStatusFilter]=useState("Todos");
  const [clientQuery,setClientQuery]=useState("");
  const [clients,setClients]=useState<ClientProfile[]>(demoClients);
  const [catalog,setCatalog]=useState<CatalogItem[]>([...services.map((item)=>({id:item.slug,type:"service" as const,name:item.name,category:item.category,price:item.price,available:item.availability!=="Indisponível"})),...products.map((item)=>({id:item.slug,type:"product" as const,name:item.name,category:item.category,price:item.price,available:item.availability!=="Indisponível"}))]);
  const [draft,setDraft]=useState({type:"service" as "service"|"product",name:"",category:"",price:""});

  useEffect(()=>{
    const current=sessionStorageAdapter.get();
    if(!current||current.role!=="admin"){router.replace("/entrar?next=/admin");return;}
    const localAppointments=appointmentStorageAdapter.list();
    const localProfile=profileStorageAdapter.get();
    queueMicrotask(()=>{
      setSession(current);
      setAppointments([...localAppointments,...demoAppointments]);
      if(localProfile)setClients((items)=>[localProfile,...items.filter((item)=>item.email!==localProfile.email)]);
    });
  },[router]);

  const filteredAppointments=useMemo(()=>appointments.filter((item)=>(!dateFilter||item.date===dateFilter)&&(statusFilter==="Todos"||item.status===statusFilter)),[appointments,dateFilter,statusFilter]);
  const filteredClients=useMemo(()=>clients.filter((item)=>`${item.name} ${item.email} ${item.phone}`.toLowerCase().includes(clientQuery.toLowerCase())),[clients,clientQuery]);
  const unavailableProducts=catalog.filter((item)=>item.type==="product"&&!item.available).length;

  function addCatalogItem(event:FormEvent){event.preventDefault();if(!draft.name||!draft.price)return;setCatalog((items)=>[{id:`custom-${Date.now()}`,type:draft.type,name:draft.name,category:draft.category||"Sem categoria",price:draft.price,available:true},...items]);setDraft({type:"service",name:"",category:"",price:""});}
  function editPrice(id:string){const item=catalog.find((entry)=>entry.id===id);if(!item)return;const value=window.prompt(`Novo valor para ${item.name}`,item.price);if(!value)return;setCatalog((items)=>items.map((entry)=>entry.id===id?{...entry,price:value}:entry));}
  function logout(){sessionStorageAdapter.clear();router.push("/entrar");}
  if(!session)return <section className="dashboard"><div className="loading-state">Carregando painel...</div></section>;

  return <section className="dashboard admin-dashboard">
    <div className="dashboard-top"><div className="welcome"><span className="avatar dark"><User size={28}/></span><div><span>Painel administrativo</span><h1>Gestão da esmalteria</h1></div></div><button className="text-button" onClick={logout}>Sair</button></div>
    <div className="metric-grid"><article><Calendar/><small>Agendamentos</small><strong>{appointments.filter((item)=>item.status==="Confirmado").length}</strong><span>Dados demonstrativos + reservas locais</span></article><article><User/><small>Clientes</small><strong>{clients.length}</strong><span>Cadastros simulados</span></article><article><Bag/><small>Produtos indisponíveis</small><strong>{unavailableProducts}</strong><span>Disponibilidade simulada</span></article></div>
    <div className="admin-tabs" role="tablist"><button className={tab==="agenda"?"active":""} onClick={()=>setTab("agenda")}>Agenda</button><button className={tab==="clientes"?"active":""} onClick={()=>setTab("clientes")}>Clientes</button><button className={tab==="catalogo"?"active":""} onClick={()=>setTab("catalogo")}>Serviços e produtos</button></div>
    {tab==="agenda"&&<div className="admin-panel"><div className="panel-heading"><div><span className="kicker">Operação</span><h2>Agenda</h2></div><div className="compact-filters"><input aria-label="Filtrar por data" type="date" value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)}/><select aria-label="Filtrar por status" value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}><option>Todos</option><option>Confirmado</option><option>Cancelado</option><option>Concluído</option></select></div></div>{filteredAppointments.length?<div className="responsive-table">{filteredAppointments.map((item)=><div className="admin-row" key={item.id}><strong>{item.time}</strong><span>{new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR")}</span><span>{item.clientName}</span><span>{item.serviceName}</span><i>{item.status}</i></div>)}</div>:<div className="empty-state compact-empty"><h2>Nenhum horário encontrado</h2></div>}</div>}
    {tab==="clientes"&&<div className="admin-panel"><div className="panel-heading"><div><span className="kicker">Relacionamento</span><h2>Clientes</h2></div><input className="admin-search" placeholder="Buscar nome ou contato" value={clientQuery} onChange={(e)=>setClientQuery(e.target.value)}/></div><div className="client-admin-grid">{filteredClients.map((client)=><article key={client.id}><strong>{client.name}</strong><span>{client.email}</span><span>{client.phone||"Sem telefone"}</span><small>{client.address.city?`${client.address.city}/${client.address.state}`:"Endereço não informado"}</small></article>)}</div></div>}
    {tab==="catalogo"&&<div className="admin-panel"><div className="panel-heading"><div><span className="kicker">Cadastros</span><h2>Serviços e produtos</h2></div></div><form className="inline-admin-form" onSubmit={addCatalogItem}><select value={draft.type} onChange={(e)=>setDraft({...draft,type:e.target.value as "service"|"product"})}><option value="service">Serviço</option><option value="product">Produto</option></select><input required placeholder="Nome" value={draft.name} onChange={(e)=>setDraft({...draft,name:e.target.value})}/><input placeholder="Categoria" value={draft.category} onChange={(e)=>setDraft({...draft,category:e.target.value})}/><input required placeholder="Preço" value={draft.price} onChange={(e)=>setDraft({...draft,price:e.target.value})}/><button className="button primary">Adicionar</button></form><div className="catalog-admin-list">{catalog.map((item)=><article key={item.id}><div><small>{item.type==="service"?"Serviço":"Produto"} • {item.category}</small><strong>{item.name}</strong><span>{item.price}</span></div><div className="catalog-admin-actions"><button onClick={()=>editPrice(item.id)}>Editar preço</button><button onClick={()=>setCatalog((items)=>items.map((entry)=>entry.id===item.id?{...entry,available:!entry.available}:entry))}>{item.available?"Desativar":"Ativar"}</button></div></article>)}</div></div>}
  </section>;
}
