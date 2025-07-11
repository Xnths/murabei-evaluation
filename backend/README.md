# Backend

## Vamos lá!

### Configuração

Incie o ambiente python

```bash
python -m venv venv
source venv/bin/activate
```

Então, instale as depedências

```bash
pip install -r requirements.txt
```

### Docker

Execute:

```bash
./build.bash
```

Depois vá ao diretório \_docker-compose e execute:

```bash
./docker-up.bash
```

### Execução

Execute uma requição para a url com curl (ou Postman)

```bash
curl http://localhost:5000/status
```

Se a resposta for "online", tudo está funcionando corretamente.

## Testes

Estamos usando BDD (Behavior Driven Design/Development).

Dessa forma temos features em Gherkin e testes para as funcionalidades e cenários em pytest.

Para executá-los, faça:

```bash
pytest
```

Recomenda-se acompanhar o [Example Mapping](https://www.figma.com/board/kFu5Htr3nZndNXy7wtoYje/Untitled?node-id=0-1&t=2tnRx7ZgBrn9Yjuf-1) feito para esse projeto.

**ATENÇÃO**: ao rodar os testes eles irão apagar o banco de dados. Então, após fazer o comando do pytest, recomanda-se rodar novamente o build.bash para copiar a seed para o banco de dados novamente.
