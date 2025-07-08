# Murabei test

## Description

Esse e o teste para Desenvolvedor FullStack Jr na Murabei Data Science, usando Docker, Python, Nextjs and sqlite3.

O objetivo deste teste e avaliar a capcidade do desenvolvedor em criar uma aplicacao Frontend e integra-la em uma API Python. Toda a aplicacao e mantida em containers Docker, e roda usando docker compose. Esta e a mesma arquitetura usada em todos os projetos internos da Murabei.

## Instrucoes

O repositorio e dividido em 3 pastas:

- \_docker-compose
- backend
- frontend

Na pasta **_\_docker-compose_**, estao os arquivos responsaveis por subir todas as imagens Docker. Um **docker-compose.yml**, que possui as informacoes de quais containers e imagens devem subir; um script **docker-up.bash** que sobe os containers baseado no arquivo **docker-compose.yml**; e um arquivo **docker.log**, que armazena todos os logs da aplicacao.

Ja na pasta **_backend_** esta a API de livros, em Python Flask. Esta API tem uma gama de operacoes basicas, como listagem de livros, criacao, busca por autor e titulo. Esta API ja esta pre-pronta, mas pode ser alterada de acordo com a sua necessidade, sem problemas.

Esta pasta possui um script **build.bash** na pasta **_backend_**, que builda a imagem docker a ser utilizada no **docker-compose.yml**.

E, a pasta **_frontend_**, onde devem ser colocados codigos do FE. Aqui na Murabei, utilizamos o NextJS como framework de React, logo, seu FE deve ser desenolvido em NextJS, pelo menos, na versao 14.2.25;

## Inicializacao

Clone o repositorio do Github, e va na pasta **_backend_**, e rode o script **_build.bash_**. Esse script ira buildar uma imagem docker local para o seu backend. Depois, va na pasta **_\_docker-compose_** e rode o script **_docker-up.bash_**, que ira subir o **docker-compose.yml**, subindo todos os servicos.

## Objetivos do Teste

O objetivo deste teste e criar uma aplicacao FE em NextJS que faz as operacoes basicas de CRUD, como listar, criar e deletar livros, alem de permitir buscar esses livros pelo titulo ou pelo autor.

O FE podera rodar em modo de desenolvimento, mas se comunicando com a API rodando no docker-compose.

## Avaliacao

Aqui vao os pontos que sera avaliados no teste:

**_Obrigatorios_**

- O FE deve possuir uma tela de listagem dos livros 
- O FE deve possuir uma tela de busca de livros por titulo
- O FE deve possuir uma tela de busca de livros por autor 
- O FE deve possuir uma tela de criacao de livros 
- As telas devem ser feitas usando componentes da biblioteca [shadcn/ui](https://ui.shadcn.com/) 
