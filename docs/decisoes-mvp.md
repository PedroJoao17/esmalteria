# Decisões pendentes do MVP

Este documento registra os pontos da Sprint 1 que dependem de validação do negócio. Enquanto não houver confirmação da cliente, o frontend utiliza dados demonstrativos claramente identificados.

## 1. Dados reais do negócio — issue #1

Ainda precisam ser confirmados:

- nome/marca final;
- serviços oferecidos;
- descrição, preço e duração de cada serviço;
- produtos e categorias comercializadas;
- preços dos produtos;
- endereço ou região de atendimento;
- telefone/WhatsApp;
- horários de funcionamento;
- imagens e fotos autorizadas.

### Regra temporária

Os dados em `src/data/catalog.ts` são mocks e não devem ser considerados informações comerciais definitivas.

## 2. Modelo de venda dos produtos — issue #2

Alternativas em avaliação:

1. catálogo com contato pelo WhatsApp;
2. reserva para retirada;
3. compra completa dentro do sistema.

Até a decisão, o catálogo permite pesquisa e consulta de detalhes, mas não apresenta uma ação falsa de compra.

## 3. Recursos demonstrativos — issue #3

Precisam ser classificados como MVP, pós-MVP ou removidos:

- clube de vantagens;
- avaliações/depoimentos;
- indicadores administrativos;
- pagamentos online;
- notificações;
- relatórios avançados.

## Diretriz de desenvolvimento

As decisões acima não bloqueiam a construção das jornadas de catálogo e agendamento. A implementação deve manter os dados e regras desacoplados para permitir substituição posterior sem reescrever os componentes visuais.
