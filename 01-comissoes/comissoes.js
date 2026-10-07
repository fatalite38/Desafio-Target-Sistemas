const fs = require("node:fs");
const path = require("node:path");

function calcularComissoes(vendas) {
  const comissoes = new Map();

  for (const { vendedor, valor } of vendas) {
    if (typeof vendedor !== "string" || !vendedor.trim() ||
        !Number.isFinite(valor) || valor < 0) {
      throw new Error("Cada venda deve ter um vendedor e um valor não negativo.");
    }

    const valorCentavos = Math.round(valor * 100);
    let percentual = 0;

    if (valorCentavos >= 50000) {
      percentual = 5;
    } else if (valorCentavos >= 10000) {
      percentual = 1;
    }

    // Acumula em centésimos de centavo para preservar as frações de centavo.
    const comissao = valorCentavos * percentual;
    const acumulado = comissoes.get(vendedor) ?? 0;
    comissoes.set(vendedor, acumulado + comissao);
  }

  return new Map([...comissoes].map(([vendedor, total]) => [
    vendedor, Math.round(total / 100) / 100,
  ]));
}

function iniciar() {
  const arquivo = path.join(__dirname, "vendas.json");
  const dados = JSON.parse(fs.readFileSync(arquivo, "utf8"));
  if (!Array.isArray(dados.vendas)) {
    throw new Error("O JSON deve conter uma lista chamada vendas.");
  }

  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL",
  });
  for (const [vendedor, total] of calcularComissoes(dados.vendas)) {
    console.log(`${vendedor}: ${moeda.format(total)}`);
  }
}

if (require.main === module) {
  try {
    iniciar();
  } catch (erro) {
    console.error(`Erro: ${erro.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calcularComissoes };
