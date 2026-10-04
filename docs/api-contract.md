# Contrato esperado para API futura

Este documento não define a implementação do backend. Ele apenas registra o mínimo que o frontend espera para substituir os mocks.

## Configuração

```env
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_URL=https://api.exemplo.com
```

## Autenticação

### POST /auth/login

Entrada:

```json
{ "email": "cliente@exemplo.com", "password": "******" }
```

Resposta esperada:

```json
{ "email": "cliente@exemplo.com", "name": "Cliente", "role": "client" }
```

Papéis previstos: `client` e `admin`.

### POST /auth/register

Recebe nome, e-mail, senha, telefone e endereço. Deve devolver sessão + perfil.

## Catálogo

- `GET /services`
- `GET /services/{slug}`
- `GET /products`
- `GET /products/{slug}`

Os DTOs podem mudar, desde que sejam mapeados dentro da camada de serviços antes de chegar aos componentes.

## Agendamentos

Interface prevista:

- `GET /appointments/me`
- `POST /appointments`
- `PATCH /appointments/{id}`
- `POST /appointments/{id}/cancel`

A API será responsável por validar disponibilidade real e concorrência de horários.

## Administração

Interface prevista:

- `GET /admin/appointments`
- `GET /admin/clients`
- `POST/PATCH /admin/services`
- `POST/PATCH /admin/products`

## Regra arquitetural

O frontend não deve trocar mocks por chamadas HTTP diretamente nos componentes. A integração deverá substituir os adapters/gateways existentes.
