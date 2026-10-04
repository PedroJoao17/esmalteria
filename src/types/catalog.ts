export type Availability = "Disponível" | "Sob consulta" | "Indisponível";

export type ServiceCategory = "Mãos" | "Pés" | "Alongamentos" | "Nail art";
export type ProductCategory = "Perfumaria" | "Corpo e banho";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  details: string;
  price: string;
  time: string;
  tone: string;
  symbol: string;
  availability: Availability;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  color: string;
  availability: Availability;
};
