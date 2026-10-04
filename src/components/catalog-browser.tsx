"use client";

import { useMemo, useState } from "react";
import type { Product, Service } from "@/types/catalog";
import { ProductCard, ServiceCard } from "./catalog-card";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function ServiceCatalog({ items }: { items: Service[] }) {
  const categories = ["Todos", ...Array.from(new Set(items.map((item) => item.category)))] as const;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todos");

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return items.filter((item) => {
      const matchesCategory = category === "Todos" || item.category === category;
      const searchable = normalize(`${item.name} ${item.description} ${item.category}`);
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, items, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("Todos");
  };

  return (
    <>
      <div className="catalog-toolbar">
        <div className="search-field">
          <label htmlFor="service-search">Buscar serviço</label>
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: manicure, gel, pés"
          />
        </div>
        <button className="clear-filter" type="button" onClick={clearFilters} disabled={!query && category === "Todos"}>
          Limpar filtros
        </button>
      </div>
      <div className="filter-row" aria-label="Categorias de serviços">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "active" : undefined}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-summary" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}
      </p>
      {filtered.length ? (
        <div className="service-grid">{filtered.map((item) => <ServiceCard key={item.slug} item={item} />)}</div>
      ) : (
        <EmptyState title="Nenhum serviço encontrado" description="Tente outro termo ou limpe os filtros para visualizar todo o catálogo." onClear={clearFilters} />
      )}
    </>
  );
}

export function ProductCatalog({ items }: { items: Product[] }) {
  const categories = ["Todos", ...Array.from(new Set(items.map((item) => item.category)))] as const;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todos");

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return items.filter((item) => {
      const matchesCategory = category === "Todos" || item.category === category;
      const searchable = normalize(`${item.name} ${item.description} ${item.category}`);
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, items, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("Todos");
  };

  return (
    <>
      <div className="catalog-toolbar">
        <div className="search-field">
          <label htmlFor="product-search">Buscar produto</label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: perfume, sabonete, hidratante"
          />
        </div>
        <button className="clear-filter" type="button" onClick={clearFilters} disabled={!query && category === "Todos"}>
          Limpar filtros
        </button>
      </div>
      <div className="filter-row" aria-label="Categorias de produtos">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "active" : undefined}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-summary" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>
      {filtered.length ? (
        <div className="product-grid large">{filtered.map((item) => <ProductCard key={item.slug} item={item} />)}</div>
      ) : (
        <EmptyState title="Nenhum produto encontrado" description="Tente outro termo ou limpe os filtros para visualizar todo o catálogo." onClear={clearFilters} />
      )}
    </>
  );
}

function EmptyState({ title, description, onClear }: { title: string; description: string; onClear: () => void }) {
  return (
    <div className="empty-state">
      <span aria-hidden="true">✦</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="button ghost" type="button" onClick={onClear}>Ver todos</button>
    </div>
  );
}
