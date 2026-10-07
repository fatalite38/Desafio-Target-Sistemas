# 01 — Comissão de vendedores

## Enunciado original

Considerando que o json abaixo tem registros de vendas de um time comercial,
faça um programa que leia os dados e calcule a comissão de cada vendedor,
seguindo a seguinte regra para cada venda:

- Vendas abaixo de R$100,00 não gera comissão
- Vendas abaixo de R$500,00 gera 1% de comissão
- A partir de R$500,00 gera 5% de comissão

O JSON original completo está em [vendas.json](vendas.json), com os mesmos
vendedores, valores e ordem fornecidos no exercício.

## Objetivo e funcionamento

Ler o JSON, determinar a faixa de comissão de cada venda, acumular por nome
de vendedor e exibir o total de cada um em reais.

## Tecnologias e execução

JavaScript, Node.js 18 ou superior e os módulos nativos `fs` e `path`.
Não há dependências para instalar.

Na raiz do repositório:

```bash
cd 01-comissoes
node comissoes.js
```

## Entrada e saída

A entrada é o arquivo `vendas.json`. Exemplo de um registro desse arquivo:

```json
{ "vendedor": "João Silva", "valor": 1200.50 }
```

Essa venda gera R$ 60,025 antes do arredondamento do total do vendedor.
Com o arquivo completo, a saída é:

```text
João Silva: R$ 495,68
Maria Souza: R$ 465,95
Carlos Oliveira: R$ 379,37
Ana Lima: R$ 404,98
```

## Regras e suposições

- Menos de R$ 100,00: 0%; de R$ 100,00 a R$ 499,99: 1%;
  R$ 500,00 ou mais: 5%.
- A faixa é aplicada a cada venda, antes de somar por vendedor.
- Os valores de entrada são monetários, com até duas casas decimais.
- Cada registro deve ter nome de vendedor preenchido e valor numérico
  não negativo; o JSON deve conter uma lista `vendas`.
- Vendedores com o mesmo nome são agrupados. Uma venda de valor zero gera
  comissão zero, e uma lista vazia não gera linhas de saída.
- Como o enunciado não define arredondamento, as frações de centavo são
  acumuladas e o total de cada vendedor é arredondado apenas no final.
