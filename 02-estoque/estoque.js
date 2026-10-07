const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");

function registrarMovimentacao(dados, codigo, tipo, quantidade, descricao) {
  const produto = dados.estoque.find((item) => item.codigoProduto === codigo);

  if (!produto) throw new Error("Produto não encontrado.");
  if (tipo !== "entrada" && tipo !== "saida") {
    throw new Error("Tipo de movimentação inválido.");
  }
  if (!Number.isSafeInteger(quantidade) || quantidade <= 0) {
    throw new Error("A quantidade deve ser um número inteiro positivo.");
  }
  if (typeof descricao !== "string" || !descricao.trim()) {
    throw new Error("Informe uma descrição para a movimentação.");
  }
  if (tipo === "saida" && quantidade > produto.estoque) {
    throw new Error("Estoque insuficiente para essa saída.");
  }

  const estoqueFinal = tipo === "entrada"
    ? produto.estoque + quantidade
    : produto.estoque - quantidade;

  if (!Number.isSafeInteger(estoqueFinal)) {
    throw new Error("A quantidade final ultrapassa o limite permitido.");
  }

  const historico = dados.movimentacoes ?? [];
  const ultimoId = historico.reduce((maior, item) => Math.max(maior, item.id), 0);
  if (!Number.isSafeInteger(ultimoId + 1)) {
    throw new Error("Limite de identificadores atingido.");
  }

  const movimentacao = {
    id: ultimoId + 1,
    codigoProduto: codigo,
    tipo,
    descricao: descricao.trim(),
    quantidade,
    estoqueAnterior: produto.estoque,
    estoqueFinal,
  };

  produto.estoque = estoqueFinal;
  dados.movimentacoes = [...historico, movimentacao];
  return movimentacao;
}

async function iniciar() {
  const arquivoInicial = path.join(__dirname, "estoque.json");
  const arquivo = path.join(__dirname, "dados-estoque.json");
  const origem = fs.existsSync(arquivo) ? arquivo : arquivoInicial;
  let dados = JSON.parse(fs.readFileSync(origem, "utf8"));
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    while (true) {
      console.table(dados.estoque);
      const opcao = (await terminal.question(
        "1 - Entrada | 2 - Saída | 0 - Encerrar: "
      )).trim();

      if (opcao === "0") break;
      if (opcao !== "1" && opcao !== "2") {
        console.log("Opção inválida.\n");
        continue;
      }

      const codigo = Number(await terminal.question("Código do produto: "));
      const quantidade = Number(await terminal.question("Quantidade: "));
      const descricao = await terminal.question("Descrição (ex.: compra ou venda): ");

      try {
        // Só atualiza os dados em memória depois que o arquivo for salvo.
        const novosDados = structuredClone(dados);
        const movimento = registrarMovimentacao(
          novosDados, codigo, opcao === "1" ? "entrada" : "saida", quantidade, descricao
        );

        fs.writeFileSync(arquivo, JSON.stringify(novosDados, null, 2), "utf8");
        dados = novosDados;

        const produto = dados.estoque.find((item) => item.codigoProduto === codigo);
        console.log(`\nMovimentação nº ${movimento.id}: ${movimento.descricao}`);
        console.log(`Produto: ${produto.descricaoProduto}`);
        console.log(`Estoque final: ${movimento.estoqueFinal} unidades.\n`);
      } catch (erro) {
        console.log(`Erro: ${erro.message}\n`);
      }
    }
  } finally {
    terminal.close();
  }
}

if (require.main === module) {
  iniciar().catch((erro) => {
    console.error(`Não foi possível executar o programa: ${erro.message}`);
    process.exitCode = 1;
  });
}

module.exports = { registrarMovimentacao };
