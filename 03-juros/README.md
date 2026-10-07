# 03 — Juros por atraso

## Enunciado original

Faça um programa que a partir de um valor e de uma data de vencimento,
calcule o valor dos juros na data de hoje considerando que a multa seja de
2,5% ao dia.

## Objetivo e funcionamento

Solicitar o valor original e o vencimento, consultar a data atual do computador
e exibir os dias de atraso, os juros e o valor total.

## Tecnologias e execução

JavaScript, Node.js 18 ou superior e o módulo nativo `readline/promises`.
Não há dependências para instalar.

Na raiz do repositório:

```bash
cd 03-juros
node juros.js
```

## Entrada e saída

Exemplo considerando execução em **07/10/2026**:

```text
Valor (ex.: 1000,00): 1000,00
Vencimento (DD/MM/AAAA): 03/10/2026
```

Saída:

```text
Data de hoje: 07/10/2026
Dias de atraso: 4
Juros / multa: R$ 100,00
Valor total: R$ 1.100,00
```

A data exibida e o resultado mudam conforme o dia em que o programa for executado.

## Cálculo, contagem dos dias e validações

- Interpretação adotada: juros/multa **simples de 2,5% ao dia**, sobre o valor
  original. Não há capitalização nem multa fixa adicional.
- `dias de atraso = máximo entre 0 e (data de hoje − vencimento)`.
- São contados dias corridos, incluindo fins de semana; horas são ignoradas.
  No dia do vencimento são zero dias; no dia seguinte, um dia.
- Vencimento hoje ou em data futura: juros zero e total igual ao valor original.
- `juros = valor original × 0,025 × dias de atraso`.
- `total = valor original + juros`.
- Usa-se a data local do computador. Para comparar os dias, ambas as datas
  são representadas à meia-noite em UTC, evitando diferenças de horário de verão.
- O valor deve ser positivo, com até duas casas decimais. Aceita `1000,00`
  ou `1000.00`, sem `R$` e sem separadores de milhares.
- O vencimento deve seguir `DD/MM/AAAA` e ser uma data real. Datas como
  `31/02/2026` são rejeitadas; anos bissextos são considerados.
- Os juros são arredondados para centavos ao final do cálculo, e o total soma
  esses juros ao valor original.
