# Esmalteria

MVP frontend mobile-first para uma esmalteria com serviços de manicure/pedicure, agendamento e catálogo de perfumes, sabonetes e hidratantes.

## Estado do frontend

A `development` contém o MVP funcional demonstrável:

- landing page e identidade visual responsiva;
- catálogo de serviços e produtos com busca, filtros, estados vazios e detalhes;
- agendamento simulado com serviço, data, horário, revisão e confirmação;
- remarcação e cancelamento;
- login único para cliente e administradora;
- cadastro de cliente com preenchimento de endereço por CEP;
- área da cliente com perfil, próximos atendimentos e histórico;
- painel administrativo com agenda, clientes, indicadores e manutenção simulada do catálogo;
- catálogo de produtos com CTA de interesse via WhatsApp;
- persistência local dos fluxos demonstrativos;
- gateways/adapters para substituir mocks por API futuramente;
- CI com lint e build.

## Decisões do MVP

### Autenticação

Existe **uma única tela de login**. O papel retornado pela autenticação define o destino:

- `client` → `/cliente`;
- `admin` → `/admin`.

No modo mock há contas demonstrativas na própria tela. Em produção, o papel deverá vir da API/token, não de uma segunda página de login.

### Produtos

O MVP usa **catálogo + WhatsApp**. Carrinho, pedido interno e pagamento online ficam fora do escopo atual.

### Recursos pós-MVP

- clube de vantagens;
- avaliações públicas;
- pagamentos online;
- notificações;
- relatórios avançados.

Os indicadores administrativos básicos permanecem para demonstrar a gestão.

## Stack

- Next.js 16;
- React 19;
- TypeScript;
- CSS mobile-first;
- ViaCEP para preenchimento de endereço;
- Netlify preparado por `netlify.toml`;
- API Java Spring prevista para a fase posterior.

## Executar localmente

```bash
git switch development
git pull origin development
npm install
npm run dev
```

Acesse `http://localhost:3000`.

> Por enquanto use `npm install`. O lockfile atual apresentou incompatibilidade com `npm ci` no runner da CI.

## Contas demonstrativas

Cliente:

```text
cliente@esmalteria.demo
123456
```

Administradora:

```text
admin@esmalteria.demo
123456
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` quando quiser configurar integrações:

- `NEXT_PUBLIC_DATA_SOURCE=mock` mantém o frontend independente;
- `NEXT_PUBLIC_DATA_SOURCE=api` usa a API configurada;
- `NEXT_PUBLIC_API_URL` aponta para o backend futuro;
- `NEXT_PUBLIC_WHATSAPP_NUMBER` define o número comercial no formato internacional.

## Validar

```bash
npm run lint
npm run build
```

## Organização técnica

- `src/data`: mocks.
- `src/types`: contratos do domínio.
- `src/services`: gateways de dados, autenticação, CEP e integração futura.
- `src/lib/app-storage.ts`: adapter de persistência local do protótipo.
- `src/components`: UI e fluxos funcionais.
- `docs/frontend-architecture.md`: decisões de arquitetura do frontend.
- `docs/api-contract.md`: contrato esperado para a integração futura.

## Deploy

O projeto permanece configurado para Netlify. O código e o build ficam prontos para publicação; a criação/associação do site Netlify é uma ação externa ao repositório.
