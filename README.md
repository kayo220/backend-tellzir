# Tellzir
## Processo Seletivo - Vizir (Kayo Costa)

O Tellzir-FaleMais é um sistema responsável por disponibilizar trasparência para os usuários em relação aos valores cobrados através de ligações utilizando a Discagem Direta a Distância (DDD). Através dele, um cliente da empresa consegue simular a cobrança com e sem o uso de uma franquia (plano).

## Funcionalidades

- Criação de DDD
- Criação de Plano
- Criação de tarifação entre DDDs
- Realização de simualação de cobrança de chamada (com e sem uso de plano)
- Listagem de DDD, Plano e tarifações

## Principais Tecnologias Utilizadas
- Node.js
- Typescript
- SQLite
- Typeorm
- Jest
- Supertest

## Instalação

Tellzir-FaleMais requer o [Node.js](https://nodejs.org/) / [Yarn](https://www.npmjs.com/package/yarn).

Instalação de dependências.
Após clonar o repositório, execute o comando para a instalação das dependências do projeto: 
```sh
yarn install
```

Para iniciar o servidor, utilize: 
```sh
yarn start-dev
```

Para executar os testes, utilize: 
```sh
yarn test
```

Para uma versão limpa do banco de dados você pode deletar o arquivo database.sqlite (dentro do diretório src/database) e executar o comando: 
```sh
yarn typeorm migration:run
```

Para uma versão básica do banco de dados (com apenas os registros propostos através do arquivo ShowTheCode), utilize: 
```sh
yarn seed:run
```
