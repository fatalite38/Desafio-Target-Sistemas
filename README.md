# Exercícios do processo seletivo

Três programas independentes em JavaScript para Node.js, executados no terminal.

| Exercício | Objetivo | Pasta |
| --- | --- | --- |
| 1 | Calcular a comissão por vendedor a partir de vendas em JSON | [01-comissoes](01-comissoes/README.md) |
| 2 | Registrar entradas e saídas e informar o saldo do produto | [02-estoque](02-estoque/README.md) |
| 3 | Calcular juros simples de 2,5% por dia de atraso | [03-juros](03-juros/README.md) |

## Requisitos e execução

É necessário Node.js 18 ou superior. Os programas usam apenas módulos nativos:
**não há dependências para instalar e não é necessário executar `npm install`.**

Na pasta raiz do repositório, confira o Node.js e execute o exercício desejado:

```bash
node --version
node 01-comissoes/comissoes.js
node 02-estoque/estoque.js
node 03-juros/juros.js
```

Execute os comandos de estoque e juros individualmente: eles solicitam dados no
terminal. Cada pasta contém o enunciado, as instruções e um exemplo completo.

## Dados e regras

- Os JSONs dos exercícios 1 e 2 preservam os dados originais do enunciado.
- As comissões são calculadas por venda e somadas por vendedor.
- O estoque e seu histórico são salvos localmente em `02-estoque/dados-estoque.json`,
  ignorado pelo Git, mantendo o JSON inicial intacto.
- Os juros usam o valor original e os dias corridos de atraso até a data atual
  do computador. Vencimento hoje ou no futuro gera zero de juros.
- Valores monetários são arredondados para centavos ao final do cálculo.

## Verificação

Foram executados os três programas com exemplos do enunciado e verificadas as
faixas de comissão, entradas e saídas, saldo insuficiente, sequência de IDs
após reabrir, datas inválidas, ano bissexto e vencimentos hoje ou no futuro.
