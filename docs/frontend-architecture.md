# Arquitetura do frontend

## Princípios

O MVP é frontend-first, mobile-first e não depende do backend para demonstração. Mocks e `localStorage` simulam persistência, mas ficam isolados atrás de gateways/adapters.

## Autenticação

A aplicação possui uma única rota de entrada: `/entrar`.

Não são mantidas duas telas de login porque as credenciais pertencem ao mesmo mecanismo de autenticação. O papel da conta determina autorização e redirecionamento:

- cliente → área da cliente;
- admin → painel administrativo.

No mock, `admin@esmalteria.demo` recebe papel `admin`; demais contas recebem `client`. Quando a API existir, `loginUser` passará a consumir `POST /auth/login` e o papel virá do servidor.

## Persistência demonstrativa

As chaves locais são:

- `esmalteria:session`;
- `esmalteria:profile`;
- `esmalteria:appointments`.

Componentes não acessam `localStorage` diretamente: usam adapters em `src/lib/app-storage.ts`.

## Catálogo

`catalogGateway` escolhe a fonte de dados conforme `NEXT_PUBLIC_DATA_SOURCE`:

- `mock`: usa `src/data/catalog.ts`;
- `api`: usa HTTP em `NEXT_PUBLIC_API_URL`.

## Endereço

O cadastro consulta o ViaCEP quando o CEP possui 8 dígitos. Rua, bairro, cidade e UF são preenchidos quando disponíveis. Todos os campos continuam editáveis para permitir correção ou preenchimento manual.

## Produtos

O MVP não implementa checkout. A página de detalhe gera CTA para WhatsApp. O número real pode ser definido com `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Responsividade

A navegação inferior é priorizada em telas pequenas. Formulários mudam de múltiplas colunas para coluna única; agenda e administração deixam de depender de tabelas largas e passam a cartões/linhas compactas.

## Evolução para API

A troca para backend deve acontecer dentro da camada de serviços, preservando contratos de `Service`, `Product`, `Session`, `ClientProfile` e `Appointment`. As telas não devem incorporar URLs ou detalhes de DTO do backend.
