import { LoginForm } from "@/components/auth-ui";
import { Shell } from "@/components/shell";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return <Shell><section className="auth-page"><LoginForm nextPath={params.next} /></section></Shell>;
}
