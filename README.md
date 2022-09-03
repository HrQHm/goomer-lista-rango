# Goomer Lista Rango

[![typescript](https://img.shields.io/badge/typescript-4.3.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![postgres](https://img.shields.io/badge/postgres-8.6.0-326690?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![NodeJS](https://img.shields.io/badge/NodeJs-v16.13.1-green)](https://nodejs.org/en/)


API RESTful capaz de gerenciar os restaurantes e os produtos do seu cardápio.

<p align="center">
 <a href="#features">Features</a> •
 <a href="#arquitetura">Arquitetura</a> •
 <a href="#como-usar">Como usar</a> •
 <a href="#considerações">Considerações</a> •
</p>


---

### Como Usar

```
$ yarn
```
Ou:
```
$ npm install
```

### **Configurando Banco de dados**
A aplicação usa um único banco de dados: [Postgres](https://www.postgresql.org/). Para a configuração mais rápida é recomendado usar [docker-compose](https://docs.docker.com/compose/), basta fazer o up de todos os serviços:
```
$ docker-compose up -d
```

### Postgres
Responsável por armazenar os dados da API. Se por algum motivo você quiser criar um contêiner Postgres em vez de usar `docker-compose`, poderá fazê-lo executando o seguinte comando:
```
$ docker run --name goomer_api-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

> Em seguida no _Postgres_, crie um bancos de dados: `goomer_api`.

### Migrations
Lembre se de rodar a migrations do prisma bem como a inicialização do prisma:
```
$ yarn prisma generate
```
Ou:
```
$ yarn prisma migrate dev
```

## `.env`
Neste arquivo, você deve configurar sua conexão do banco de dados  do Postgres
No diretório raiz crie um arquivo .env e então insira suas configurações.

---

### **Rodando a aplicação**
Para iniciar a aplicação rode o comando abaixo.
```
$ yarn dev:server
```
Ou:
```
npm run dev:server
```

---

## Features
- [x] Listar restaurantes.
- [x] Buscar por um ou mais restaurantes.
- [x] Exibir dados de um determinado restaurante
- [x] Atualiação de Dados de um Restaurante
- [x] Excluir um restaurante juntamente de seus dados de produtos e promoções
#### Produtos
- [x] Criar/Atualizar/Deletar produto
- [x] Listar cardárpio do restaurante.
- [x] Buscar por um ou mais produtos do cardápio.
- [x] Criação de uma promoção para um produto
- [x] Listagem de produtos em promoção de um restaurante
- [x] Testes unitários em todas as funcionalidades

### Arquitetura
```shell
src/
|-- modules/ # Contém todos os módulos da aplicação.
|-- modules/nome_modulo/dtos/ # Interface de métodos/retorno.
|-- modules/infra/entities/ # Entidades.
|-- modules/infra/repositories # Repositório de cada módulo.
|-- modules/repositories/ # Repositório de teste.
|-- modules/useCases/ # Contém todos os arquivos para cada funcionalidade do módulo
|-- shared/error # Classe de tratamento de erro.
|-- shared/infra/http/ # Arquivos de roteamento e servidor da aplicação.
|-- shared/infra/typeorm # Migrations.
```
---

## Considerações Finais

Durante o desenvolvimento tive dificuldades na questão de visualizar como/qual seria a melhor de vincular a promoção ao produto. No caso se deveria criar uma tabela apenas para promoções, ou criar um campo de array para permitir inserir os horários/dias de promoções. Enfim pensando qual seria a melhor solução para este caso. 
Existe um ponto à ser dito é que não tratei a questão do formato do horário, pois na minha visão isso deveria ser tratado no front da aplicação. Por isso não implementei este trecho.
Em quanto a questão de melhoria, olhando do ponto de vista do backend, seria bem interessante a criação da figura do 'Usuário'. Por exemplo apenas usuários autorizados pow JWT poderiam acessar as rotas, mas dados mais sensíveis apenas usuários administradores. Levaria esta aplicação/desafio à um novo nível.

