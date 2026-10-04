"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/types/catalog";
import type { Appointment } from "@/types/app";
import { appointmentStorageAdapter, sessionStorageAdapter } from "@/lib/app-storage";

const slots = ["09:00", "10:30", "13:30", "15:00", "16:30", "18:00"];

function nextDates() {
  const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const iso = date.toISOString().slice(0, 10);
    return { iso, label: formatter.format(date).replace(".", "") };
  });
}

export function BookingFlow({ services }: { services: Service[] }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const dates = useMemo(nextDates, []);
  const service = services.find((item) => item.slug === serviceSlug);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");
    const appointmentId = params.get("reschedule");
    if (requestedService && services.some((item) => item.slug === requestedService)) setServiceSlug(requestedService);
    if (appointmentId) {
      setRescheduleId(appointmentId);
      const existing = appointmentStorageAdapter.list().find((item) => item.id === appointmentId);
      if (existing) {
        setServiceSlug(existing.serviceSlug);
        setDate(existing.date);
        setTime(existing.time);
      }
    }
  }, [services]);

  function goReview() {
    if (!serviceSlug || !date || !time) {
      setMessage("Escolha serviço, data e horário para continuar.");
      return;
    }
    setMessage("");
    setStep(2);
  }

  function confirm() {
    const session = sessionStorageAdapter.get();
    if (!session || session.role !== "client") {
      setMessage("Entre como cliente para confirmar o agendamento.");
      return;
    }
    if (!service) return;

    const appointment: Appointment = {
      id: rescheduleId ?? `apt-${Date.now()}`,
      clientEmail: session.email,
      clientName: session.name,
      serviceSlug: service.slug,
      serviceName: service.name,
      date,
      time,
      duration: service.time,
      price: service.price,
      status: "Confirmado",
      createdAt: new Date().toISOString(),
    };
    appointmentStorageAdapter.save(appointment);
    setMessage("");
    setStep(3);
  }

  if (!service) return <div className="empty-state"><h2>Nenhum serviço disponível</h2></div>;

  return (
    <section className="booking-shell">
      <div className="booking-progress" aria-label="Etapas do agendamento">
        <span className={step >= 1 ? "active" : ""}>1 <small>Escolha</small></span>
        <i />
        <span className={step >= 2 ? "active" : ""}>2 <small>Revisão</small></span>
        <i />
        <span className={step >= 3 ? "active" : ""}>3 <small>Confirmação</small></span>
      </div>

      {step === 1 && (
        <div className="booking-card">
          <span className="kicker">{rescheduleId ? "Remarcar atendimento" : "Novo agendamento"}</span>
          <h1>Escolha seu horário</h1>
          <label className="field">Serviço
            <select value={serviceSlug} onChange={(e) => { setServiceSlug(e.target.value); setDate(""); setTime(""); }}>
              {services.map((item) => <option key={item.slug} value={item.slug}>{item.name} — {item.price}</option>)}
            </select>
          </label>
          <div className="booking-section">
            <strong>Data</strong>
            <div className="date-options">
              {dates.map((item) => <button type="button" key={item.iso} className={date === item.iso ? "selected" : ""} onClick={() => { setDate(item.iso); setTime(""); }}>{item.label}</button>)}
            </div>
          </div>
          <div className="booking-section">
            <strong>Horário</strong>
            <div className="time-options">
              {slots.map((slot, index) => {
                const unavailable = date && (index + date.charCodeAt(date.length - 1)) % 5 === 0;
                return <button type="button" key={slot} disabled={Boolean(unavailable)} className={time === slot ? "selected" : ""} onClick={() => setTime(slot)}>{slot}</button>;
              })}
            </div>
          </div>
          {message && <p className="form-message error" role="alert">{message}</p>}
          <button type="button" className="button primary full" onClick={goReview}>Revisar agendamento</button>
        </div>
      )}

      {step === 2 && (
        <div className="booking-card review-card">
          <span className="kicker">Confira antes de confirmar</span>
          <h1>Resumo</h1>
          <dl className="review-list">
            <div><dt>Serviço</dt><dd>{service.name}</dd></div>
            <div><dt>Data</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")}</dd></div>
            <div><dt>Horário</dt><dd>{time}</dd></div>
            <div><dt>Duração</dt><dd>{service.time}</dd></div>
            <div><dt>Valor</dt><dd>{service.price}</dd></div>
          </dl>
          <p className="mock-disclaimer">Fluxo demonstrativo: a disponibilidade será validada pelo backend na integração real.</p>
          {message && <div className="form-message error" role="alert">{message} <Link href={`/entrar?next=${encodeURIComponent(window.location.pathname + window.location.search)}`}>Entrar agora</Link></div>}
          <div className="button-row">
            <button type="button" className="button ghost" onClick={() => setStep(1)}>Voltar e editar</button>
            <button type="button" className="button primary" onClick={confirm}>{rescheduleId ? "Confirmar remarcação" : "Confirmar agendamento"}</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="booking-card success-state">
          <span className="success-icon">✓</span>
          <span className="kicker">Tudo certo</span>
          <h1>{rescheduleId ? "Agendamento remarcado" : "Agendamento confirmado"}</h1>
          <p>{service.name} em {new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")} às {time}.</p>
          <div className="button-row">
            <Link className="button primary" href="/cliente">Ver meus agendamentos</Link>
            <Link className="button ghost" href="/servicos">Explorar serviços</Link>
          </div>
        </div>
      )}
    </section>
  );
}
