const readline = require("node:readline/promises");

function converterData(texto) {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
  if (!partes) throw new Error("Informe a data no formato DD/MM/AAAA.");

  const [, dia, mes, ano] = partes.map(Number);
  const data = new Date(0);
  data.setUTCFullYear(ano, mes - 1, dia);
  data.setUTCHours(0, 0, 0, 0);

  if (ano < 1 || data.getUTCFullYear() !== ano ||
      data.getUTCMonth() !== mes - 1 || data.getUTCDate() !== dia) {
    throw new Error("Data de vencimento inválida.");
  }

  return data.getTime();
}

function calcularJuros(valor, vencimento, hoje = new Date()) {
  if (!Number.isFinite(valor) || valor <= 0) {
    throw new Error("Informe um valor positivo.");
  }
  const valorCentavos = Math.round(valor * 100);
  if (!Number.isSafeInteger(valorCentavos) || valorCentavos <= 0) {
    throw new Error("Valor fora do limite permitido.");
  }

  const dataVencimento = converterData(vencimento);
  // Usa a data local do computador. A comparação em UTC evita diferenças
  // causadas por horários e mudanças de horário de verão.
  const dataHoje = new Date(0);
  dataHoje.setUTCFullYear(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  dataHoje.setUTCHours(0, 0, 0, 0);

  const diasAtraso = Math.max(0, (dataHoje.getTime() - dataVencimento) / 86400000);
  // 2,5% = 25 / 1000. Calcula sobre o valor original, sem capitalização.
  const numerador = valorCentavos * 25 * diasAtraso;
  if (!Number.isSafeInteger(numerador)) {
    throw new Error("O cálculo ultrapassa o limite permitido.");
  }
  const jurosCentavos = Math.round(numerador / 1000);
  const totalCentavos = valorCentavos + jurosCentavos;
  if (!Number.isSafeInteger(totalCentavos)) {
    throw new Error("O total ultrapassa o limite permitido.");
  }

  return {
    diasAtraso,
    juros: jurosCentavos / 100,
    total: totalCentavos / 100,
  };
}

async function iniciar() {
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const entrada = (await terminal.question("Valor (ex.: 1000,00): ")).trim();
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(entrada)) {
      throw new Error("Digite o valor sem R$ e sem separador de milhares.");
    }
    const valor = Number(entrada.replace(",", "."));
    const vencimento = (await terminal.question("Vencimento (DD/MM/AAAA): ")).trim();
    const hoje = new Date();
    const resultado = calcularJuros(valor, vencimento, hoje);
    const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

    console.log(`\nData de hoje: ${hoje.toLocaleDateString("pt-BR")}`);
    console.log(`Dias de atraso: ${resultado.diasAtraso}`);
    console.log(`Juros / multa: ${moeda.format(resultado.juros)}`);
    console.log(`Valor total: ${moeda.format(resultado.total)}`);
  } finally {
    terminal.close();
  }
}

if (require.main === module) {
  iniciar().catch((erro) => {
    console.error(`Erro: ${erro.message}`);
    process.exitCode = 1;
  });
}

module.exports = { calcularJuros };
