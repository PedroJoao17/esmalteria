import { BookingFlow } from "@/components/booking-flow";
import { Shell } from "@/components/shell";
import { catalogGateway } from "@/services/app-service";

export default async function BookingPage() {
  const services = await catalogGateway.listServices();
  return <Shell><section className="page-hero booking-hero"><span className="kicker">Reserva demonstrativa</span><h1>Agendar horário</h1><p>Escolha serviço, data e horário. A confirmação fica salva localmente para você testar toda a jornada do frontend.</p></section><BookingFlow services={services} /></Shell>;
}
