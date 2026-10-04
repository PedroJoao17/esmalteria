"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { appointmentStorageAdapter, profileStorageAdapter, sessionStorageAdapter } from "@/lib/app-storage";
import type { Appointment, ClientProfile, Session } from "@/types/app";
import { Calendar, User } from "./icons";

const demoHistory: Appointment = {
  id: "demo-history",
  clientEmail: "cliente@esmalteria.demo",
  clientName: "Cliente Demo",
  serviceSlug: "pedicure-spa",
  serviceName: "Pedicure spa",
  date: "2026-09-20",
  time: "10:30",
  duration: "70 min",
  price: "R$ 55",
  status: "Concluído",
  createdAt: "2026-09-15T12:00:00.000Z",
};

export function ClientDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const current = sessionStorageAdapter.get();
    if (!current || current.role !== "client") {
      router.replace("/entrar?next=/cliente");
      return;
    }
    setSession(current);
    setProfile(profileStorageAdapter.get());
    setAppointments(appointmentStorageAdapter.list());
  }, [router]);

  const upcoming = useMemo(() => appointments.filter((item) => item.status === "Confirmado"), [appointments]);
  const history = useMemo(() => [...appointments.filter((item) => item.status !== "Confirmado"), demoHistory], [appointments]);

  function cancel(id: string) {
    if (!window.confirm("Deseja cancelar este agendamento demonstrativo?")) return;
    appointmentStorageAdapter.update(id, { status: "Cancelado" });
    setAppointments(appointmentStorageAdapter.list());
  }

  function logout() {
    sessionStorageAdapter.clear();
    router.push("/entrar");
  }

  if (!session) return <section className="dashboard"><div className="loading-state">Carregando sua área...</div></section>;

  return (
    <section className="dashboard client-dashboard">
      <div className="dashboard-top">
        <div className="welcome"><span className="avatar"><User size={28} /></span><div><span>Olá, {session.name}</span><h1>Seu espaço de beleza</h1></div></div>
        <button className="text-button" onClick={logout}>Sair</button>
      </div>

      <div className="client-summary">
        <article><small>Próximos atendimentos</small><strong>{upcoming.length}</strong></article>
        <article><small>Histórico</small><strong>{history.length}</strong></article>
      </div>

      <div className="section-heading inline-heading"><div><span className="kicker">Agenda</span><h2>Próximos atendimentos</h2></div><Link className="button primary" href="/agendar">Novo agendamento</Link></div>
      {upcoming.length ? <div className="appointment-list">{upcoming.map((item) => (
        <article className="appointment-card" key={item.id}>
          <span className="icon-box"><Calendar /></span>
          <div className="appointment-copy"><small>{new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR")} • {item.time}</small><h3>{item.serviceName}</h3><p>{item.duration} • {item.price}</p></div>
          <span className="status">Confirmado</span>
          <div className="appointment-actions"><Link href={`/agendar?reschedule=${item.id}&service=${item.serviceSlug}`}>Remarcar</Link><button onClick={() => cancel(item.id)}>Cancelar</button></div>
        </article>
      ))}</div> : <div className="empty-state compact-empty"><h2>Nenhum agendamento futuro</h2><p>Escolha um serviço e reserve um horário.</p><Link className="button primary" href="/agendar">Agendar agora</Link></div>}

      <div className="client-sections">
        <article className="profile-card">
          <span className="kicker">Perfil</span><h2>Seus dados</h2>
          <dl>
            <div><dt>Nome</dt><dd>{profile?.name ?? session.name}</dd></div>
            <div><dt>E-mail</dt><dd>{profile?.email ?? session.email}</dd></div>
            <div><dt>Telefone</dt><dd>{profile?.phone || "Não informado"}</dd></div>
            <div><dt>Endereço</dt><dd>{profile?.address.street ? `${profile.address.street}, ${profile.address.number || "s/n"} — ${profile.address.city}/${profile.address.state}` : "Não informado"}</dd></div>
          </dl>
          <Link href="/cadastro">Atualizar dados no formulário demonstrativo</Link>
        </article>
        <article className="history-card">
          <span className="kicker">Histórico</span><h2>Atendimentos anteriores</h2>
          <div className="history-list">{history.map((item) => <div key={item.id}><strong>{item.serviceName}</strong><span>{new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR")} • {item.status}</span></div>)}</div>
        </article>
      </div>
    </section>
  );
}
