"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_ADMIN_EMAIL, DEMO_CLIENT_EMAIL, DEMO_PASSWORD, loginUser, lookupCep, registerClient } from "@/services/app-service";
import { profileStorageAdapter, sessionStorageAdapter } from "@/lib/app-storage";
import type { Address } from "@/types/app";

const emptyAddress: Address = { cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" };

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_CLIENT_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await loginUser(email, password);
      sessionStorageAdapter.set(session);
      const destination = nextPath && nextPath.startsWith("/") ? nextPath : session.role === "admin" ? "/admin" : "/cliente";
      router.push(destination);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-card" onSubmit={submit}>
      <div className="auth-heading">
        <span className="kicker">Acesso único</span>
        <h1>Entrar</h1>
        <p>Clientes e administradora usam a mesma tela. O perfil da conta define a área liberada.</p>
      </div>

      <label className="field">E-mail
        <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label className="field">Senha
        <input type="password" minLength={6} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>

      {error && <p className="form-message error" role="alert">{error}</p>}

      <button className="button primary full" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>

      <div className="demo-access">
        <span>Contas para demonstração</span>
        <button type="button" onClick={() => { setEmail(DEMO_CLIENT_EMAIL); setPassword(DEMO_PASSWORD); }}>Cliente</button>
        <button type="button" onClick={() => { setEmail(DEMO_ADMIN_EMAIL); setPassword(DEMO_PASSWORD); }}>Administradora</button>
      </div>

      <p className="auth-foot">Ainda não tem cadastro? <a href="/cadastro">Criar conta</a></p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [message, setMessage] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateAddress(key: keyof Address, value: string) {
    setAddress((current) => ({ ...current, [key]: value }));
  }

  async function searchCep() {
    if (!address.cep.trim()) return;
    setMessage("");
    setLoadingCep(true);
    try {
      const result = await lookupCep(address.cep);
      setAddress((current) => ({ ...current, ...result }));
      setMessage("Endereço localizado. Confira os dados e informe o número.");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Não foi possível consultar o CEP. Preencha o endereço manualmente.");
    } finally {
      setLoadingCep(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (form.password !== form.confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const result = await registerClient({ name: form.name, email: form.email, phone: form.phone, password: form.password, address });
      profileStorageAdapter.set(result.profile);
      sessionStorageAdapter.set(result.session);
      router.push("/cliente");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Não foi possível concluir o cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-card register-card" onSubmit={submit}>
      <div className="auth-heading">
        <span className="kicker">Área da cliente</span>
        <h1>Criar conta</h1>
        <p>O endereço é opcional no MVP, mas o CEP pode preencher os campos automaticamente.</p>
      </div>

      <div className="form-grid two">
        <label className="field">Nome completo<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="field">Celular<input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      </div>
      <label className="field">E-mail<input type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <div className="form-grid two">
        <label className="field">Senha<input type="password" required minLength={6} autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <label className="field">Confirmar senha<input type="password" required minLength={6} autoComplete="new-password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} /></label>
      </div>

      <fieldset className="address-fieldset">
        <legend>Endereço</legend>
        <div className="cep-row">
          <label className="field">CEP<input inputMode="numeric" maxLength={9} autoComplete="postal-code" value={address.cep} onChange={(e) => updateAddress("cep", e.target.value)} onBlur={searchCep} /></label>
          <button className="button ghost" type="button" onClick={searchCep} disabled={loadingCep}>{loadingCep ? "Buscando..." : "Buscar CEP"}</button>
        </div>
        <label className="field">Rua<input autoComplete="address-line1" value={address.street} onChange={(e) => updateAddress("street", e.target.value)} /></label>
        <div className="form-grid two">
          <label className="field">Número<input value={address.number} onChange={(e) => updateAddress("number", e.target.value)} /></label>
          <label className="field">Complemento<input autoComplete="address-line2" value={address.complement} onChange={(e) => updateAddress("complement", e.target.value)} /></label>
        </div>
        <div className="form-grid three">
          <label className="field">Bairro<input value={address.neighborhood} onChange={(e) => updateAddress("neighborhood", e.target.value)} /></label>
          <label className="field">Cidade<input autoComplete="address-level2" value={address.city} onChange={(e) => updateAddress("city", e.target.value)} /></label>
          <label className="field">UF<input maxLength={2} autoComplete="address-level1" value={address.state} onChange={(e) => updateAddress("state", e.target.value.toUpperCase())} /></label>
        </div>
      </fieldset>

      {message && <p className="form-message" role="status">{message}</p>}
      <button className="button primary full" disabled={loading}>{loading ? "Criando conta..." : "Criar conta e entrar"}</button>
      <p className="auth-foot">Já possui cadastro? <a href="/entrar">Entrar</a></p>
    </form>
  );
}
