import { products, services } from "@/data/catalog";
import type { Product, Service } from "@/types/catalog";
import type { Address, ClientProfile, Session } from "@/types/app";

const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE === "api" ? "api" : "mock";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const DEMO_CLIENT_EMAIL = "cliente@esmalteria.demo";
export const DEMO_ADMIN_EMAIL = "admin@esmalteria.demo";
export const DEMO_PASSWORD = "123456";

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL não configurada.");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Não foi possível concluir a operação.");
  return response.json() as Promise<T>;
}

export const catalogGateway = {
  async listServices(): Promise<Service[]> {
    return DATA_SOURCE === "api" ? apiRequest<Service[]>("/services") : services;
  },
  async listProducts(): Promise<Product[]> {
    return DATA_SOURCE === "api" ? apiRequest<Product[]>("/products") : products;
  },
  async getService(slug: string): Promise<Service | null> {
    if (DATA_SOURCE === "api") {
      try { return await apiRequest<Service>(`/services/${slug}`); } catch { return null; }
    }
    return services.find((item) => item.slug === slug) ?? null;
  },
  async getProduct(slug: string): Promise<Product | null> {
    if (DATA_SOURCE === "api") {
      try { return await apiRequest<Product>(`/products/${slug}`); } catch { return null; }
    }
    return products.find((item) => item.slug === slug) ?? null;
  },
};

export async function loginUser(email: string, password: string): Promise<Session> {
  if (DATA_SOURCE === "api") {
    return apiRequest<Session>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  }

  if (!email.trim() || password.length < 6) throw new Error("Informe e-mail e senha com pelo menos 6 caracteres.");
  const normalized = email.trim().toLowerCase();
  const role = normalized === DEMO_ADMIN_EMAIL ? "admin" : "client";
  return {
    email: normalized,
    name: role === "admin" ? "Administradora" : normalized === DEMO_CLIENT_EMAIL ? "Cliente Demo" : normalized.split("@")[0],
    role,
  };
}

export async function registerClient(input: { name: string; email: string; password: string; phone: string; address: Address }): Promise<{ session: Session; profile: ClientProfile }> {
  if (DATA_SOURCE === "api") {
    return apiRequest<{ session: Session; profile: ClientProfile }>("/auth/register", { method: "POST", body: JSON.stringify(input) });
  }

  if (!input.name.trim() || !input.email.trim() || input.password.length < 6) throw new Error("Preencha os dados obrigatórios e use uma senha com pelo menos 6 caracteres.");
  const email = input.email.trim().toLowerCase();
  return {
    session: { email, name: input.name.trim(), role: "client" },
    profile: { id: `client-${Date.now()}`, name: input.name.trim(), email, phone: input.phone.trim(), address: input.address },
  };
}

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function lookupCep(rawCep: string): Promise<Partial<Address>> {
  const cep = rawCep.replace(/\D/g, "");
  if (!/^\d{8}$/.test(cep)) throw new Error("Informe um CEP com 8 dígitos.");
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) throw new Error("Não foi possível consultar o CEP.");
  const data = await response.json() as ViaCepResponse;
  if (data.erro) throw new Error("CEP não encontrado.");
  return {
    cep: data.cep ?? rawCep,
    street: data.logradouro ?? "",
    complement: data.complemento ?? "",
    neighborhood: data.bairro ?? "",
    city: data.localidade ?? "",
    state: data.uf ?? "",
  };
}

export function buildWhatsAppUrl(productName: string) {
  const text = encodeURIComponent(`Olá! Tenho interesse no produto ${productName}. Gostaria de saber sobre disponibilidade e retirada.`);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const frontendRuntime = {
  dataSource: DATA_SOURCE,
  apiConfigured: Boolean(API_BASE_URL),
};
