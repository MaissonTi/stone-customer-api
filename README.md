## **Nome do projeto: Customer API**

## Overview

Esta aplicação é responsável por gerenciar os clientes de uma empresa.

## Main features

- Autenticar com Keycloak;
- Listar usuários da base;
- Criar novos usuários;
- Atualizar dados de um usuário específico;

## Main frameworks

- NodeJS (>=16.x.x)
- Nest: Framework open source para typescript
- IORedis: Cliente para banco de dados em memoria (Redis).
- Jest: Framework de Testes.

## Envs

| Variável            | Descrição                            | Valor padrão                           |
| ------------------- | ------------------------------------ | -------------------------------------- |
| APP_NAME            | Nome da Aplicação                    | CUSTOMER_API                           |
| APP_PORT            | Porta da Aplicação                   | 3000                                   |
| REDIS_HOST          | Host do Redis                        | localhost                              |
| REDIS_PORT          | Porta do Redis                       | 6379                                   |
| SSO_URL             | Url Keycloak                         | https://accounts.seguros.vitta.com.br/ |
| SSO_CLIENT_ID       | Client ID para utilizar no SSO       | ---                                    |
| SSO_CLIENT_SECRET   | Chave secreta para utilizar no SSO   | ---                                    |
| SSO_CLIENT_USERNAME | Nome do usuário para utilizar no SSO | ---                                    |

## Running Locally

1. git clone
2. npm install
3. cp .env.example .env
4. docker-compose up

- Para acessar a documentação (swagger): "http://localhost:3000/api/docs"
