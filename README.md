# Esmalteria

MVP frontend mobile-first para uma esmalteria que oferece serviços de manicure, pedicure, alongamentos e também comercializa perfumes, sabonetes e hidratantes.

## Status atual

A fundação visual do projeto já foi entregue. O repositório possui páginas demonstrativas, navegação mobile e dados mockados, mas o MVP funcional ainda está em desenvolvimento.

Já estão disponíveis:

- Landing page com apresentação do negócio, serviços, produtos e chamadas para agendamento.
- Catálogo demonstrativo de serviços com descrição, preço e duração.
- Catálogo demonstrativo de perfumes, sabonetes e hidratantes.
- Área demonstrativa da cliente.
- Painel demonstrativo da administradora.
- Navegação responsiva com header e menu inferior.
- Identidade visual em tons de rosa.
- Configuração inicial para Netlify.
- Base em Next.js, React e TypeScript.
- Validação inicial de lint e build.

## Tecnologias

- Next.js 16.
- React 19.
- TypeScript.
- CSS responsivo com tokens de design próprios.
- Netlify com `@netlify/plugin-nextjs`.
- Backend futuro em Java Spring Boot.

## Executar localmente

Para um clone novo ou quando o `node_modules` não estiver instalado, utilize:

```bash
npm ci
npm run dev
```

Acesse `http://localhost:3000`.

> O comando `next` depende das dependências do projeto instaladas localmente. Se `npm run dev` retornar que `next` não foi encontrado, execute `npm ci` antes de iniciar a aplicação.

## Validar

```bash
npm run lint
npm run build
```

## Roadmap do MVP

O desenvolvimento prioriza a conclusão do frontend demonstrável antes da integração com Java Spring.

| Sprint | Objetivo | Entregas principais |
| --- | --- | --- |
| 1 — Requisitos e identidade | Consolidar a apresentação do negócio | Marca, serviços, produtos, preços, duração, contatos, fotos, horários e validação dos elementos fictícios |
| 2 — Catálogos funcionais | Permitir explorar serviços e produtos | Busca, filtros, detalhes, disponibilidade e estados vazios |
| 3 — Agendamento simulado | Demonstrar o fluxo completo de reserva | Serviço, data, horário, revisão, confirmação e estado pós-agendamento |
| 4 — Área da cliente | Demonstrar a experiência da cliente | Login/cadastro simulados, perfil, próximos atendimentos, histórico, cancelamento e remarcação |
| 5 — Administração | Demonstrar a gestão do negócio | Agenda, clientes, serviços, produtos, disponibilidade e indicadores |
| 6 — Refinamento e apresentação | Entregar o MVP frontend | Revisão mobile, acessibilidade, feedbacks, validações, navegação e publicação no Netlify |
| 7 — Preparação para API | Facilitar a integração posterior | Contratos de dados, camada de serviços e adapters para substituir mocks |
| Fase seguinte — Backend | Tornar o sistema operacional | Java Spring, banco, autenticação, permissões, persistência e regras reais |

## Decisão pendente: venda de produtos

Antes de implementar o fluxo funcional dos produtos, deve ser definido qual modelo fará parte do MVP:

1. Catálogo com contato pelo WhatsApp.
2. Reserva para retirada.
3. Compra dentro do sistema.

Essa decisão define se carrinho, pedidos e pagamento entram no escopo.

## Escopo pós-MVP ou sujeito a validação

Os seguintes elementos foram incluídos como demonstração visual ou permanecem dependentes de validação com a cliente:

- Clube de vantagens/fidelidade.
- Avaliações e depoimentos.
- Indicadores administrativos.
- Pagamentos online.
- Notificações.
- Relatórios avançados.

Eles não devem ser tratados como funcionalidades concluídas até serem aprovados e implementados.

## Issues e organização do trabalho

O backlog funcional está organizado em issues do GitHub com critérios de aceite.

- Sprint 1: issues #1 a #3.
- Sprint 2: issues #4 a #6.
- Sprint 3: issues #7 a #9.
- Sprint 4: issues #10 a #12.
- Sprint 5: issues #13 a #16.
- Sprint 6: issues #17 e #18.
- Sprint 7: issues #19 e #20.
- Backend: issue #23.

As issues #21 e #22 foram geradas como duplicatas durante a organização inicial do backlog e estão fechadas.

O Trello permanece como visão de acompanhamento do fluxo de trabalho. O GitHub concentra backlog técnico, critérios de aceite, código, documentação, commits e evolução do projeto.

## Estratégia de integração

Até a Sprint 6, a interface deverá continuar funcional com mocks. Na Sprint 7, os componentes serão desacoplados dessas fontes por meio de contratos, camada de serviços e adapters. A integração real com Java Spring ocorrerá somente na fase seguinte.

## Publicação no Netlify

O repositório já inclui `netlify.toml`. A publicação ainda precisa ser confirmada como parte da Sprint 6. Após o deploy definitivo, a URL pública deverá ser registrada nesta documentação.
