import { AdminDashboard } from "@/components/admin-dashboard";
import { Shell } from "@/components/shell";
import { catalogGateway } from "@/services/app-service";

export default async function AdminPage() {
  const [services, products] = await Promise.all([catalogGateway.listServices(), catalogGateway.listProducts()]);
  return <Shell><AdminDashboard services={services} products={products} /></Shell>;
}
