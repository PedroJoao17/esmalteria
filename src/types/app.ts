export type UserRole = "client" | "admin";

export type Session = {
  email: string;
  name: string;
  role: UserRole;
};

export type Address = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type ClientProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
};

export type AppointmentStatus = "Confirmado" | "Cancelado" | "Concluído";

export type Appointment = {
  id: string;
  clientEmail: string;
  clientName: string;
  serviceSlug: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: AppointmentStatus;
  createdAt: string;
};
