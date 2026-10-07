# 02 — Movimentações de estoque

## Enunciado original

Faça um programa onde eu possa lançar movimentações de estoque dos produtos
que estão no json abaixo, dando entrada ou saída da mercadoria no meu depósito,
onde cada movimentação deve ter:

- Um número identificador único.
- Uma descrição para identificar o tipo da movimentação realizada

E que ao final da movimentação me retorne a qtde final do estoque do produto
movimentado.

O JSON original completo está em [estoque.json](estoque.json), com os cinco
produtos e seus saldos iniciais.

## Objetivo e funcionamento

Um menu permite escolher entrada ou saída e informar código do produto,
quantidade e descrição. O programa valida a operação, atualiza o saldo,
registra o histórico e mostra o estoque final do produto.

## Tecnologias e execução

JavaScript, Node.js 18 ou superior e os módulos nativos `fs`, `path` e
`readline/promises`. Não há dependências para instalar.

Na raiz do repositório:

```bash
cd 02-estoque
node estoque.js
```

Escolha `1` para entrada, `2` para saída ou `0` para encerrar.

## Entrada e saída

Na primeira execução, informe:

```text
1 - Entrada | 2 - Saída | 0 - Encerrar: 1
Código do produto: 101
Quantidade: 20
Descrição (ex.: compra ou venda): Compra de fornecedor
```

Saída:

```text
Movimentação nº 1: Compra de fornecedor
Produto: Caneta Azul
Estoque final: 170 unidades.
```

Depois, uma saída de 10 unidades desse produto gera a movimentação nº 2
e informa estoque final de 160 unidades.

## Regras, validações e persistência

- O código deve corresponder a um produto existente.
- A quantidade deve ser inteira e positiva; a descrição não pode estar vazia.
- Uma saída maior que o saldo é rejeitada; o estoque pode chegar a zero.
- Operações rejeitadas não alteram o saldo nem geram registro.
- Cada movimento válido recebe o maior ID do histórico mais um.
- O histórico registra ID, produto, tipo, descrição, quantidade e saldos
  anterior e final.
- Saldos e histórico são salvos em `dados-estoque.json` na mesma pasta.
  Ao reabrir, o programa continua com esses saldos e IDs.
- `estoque.json` contém os dados iniciais e permanece intacto. Para reiniciar
  a demonstração, encerre o programa e exclua apenas `dados-estoque.json`.
- A solução considera uma instância em execução por vez. A unicidade dos IDs
  vale para o histórico preservado nesse arquivo.
