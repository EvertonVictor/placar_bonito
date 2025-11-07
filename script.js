// Seleciona os elementos da página
const inputText = document.getElementById('inputText');
const gerarBtn = document.getElementById('gerarBtn');
const stage = document.getElementById('stage');

// Função para "parsear" o texto e gerar a tabela HTML
function atualizarPrevia() {
    const texto = inputText.value.trim();
    const linhas = texto.split('\n'); // Divide o texto em linhas

    let htmlTabela = '<table>';

    // Processa cada linha
    linhas.forEach((linha, index) => {
        // Ignora a linha de separador "---|---"
        if (linha.includes('---|')) {
            return;
        }

        // Divide a linha pelos pipes "|"
        // filter(Boolean) remove campos vazios (antes do primeiro | e depois do último)
        const celulas = linha.split('|').filter(Boolean).map(celula => celula.trim());

        if (celulas.length === 0) {
            return; // Ignora linhas em branco
        }

        // A primeira linha é o cabeçalho (thead)
        if (index === 0) {
            htmlTabela += '<thead><tr>';
            celulas.forEach(cabecalho => {
                htmlTabela += `<th>${cabecalho}</th>`;
            });
            htmlTabela += '</tr></thead><tbody>';
        } 
        // O resto das linhas é o corpo (tbody)
        else {
            htmlTabela += '<tr>';
            celulas.forEach(dado => {
                htmlTabela += `<td>${dado}</td>`;
            });
            htmlTabela += '</tr>';
        }
    });

    htmlTabela += '</tbody></table>';
    
    // Coloca a tabela HTML pronta dentro da div#stage
    stage.innerHTML = htmlTabela;
}

// O que acontece quando o botão "Gerar" é clicado
gerarBtn.addEventListener('click', () => {
    // Pega a div#stage (que contém nossa tabela estilizada)
    const elementoParaPrintar = document.getElementById('stage');

    // Usa a biblioteca html2canvas
    html2canvas(elementoParaPrintar, {
        useCORS: true, // Necessário se você tiver imagens externas
        scale: 2       // Gera a imagem com o dobro da resolução (fica mais nítido)
    }).then(canvas => {
        // O canvas é a imagem "desenhada"
        // Cria um link <a> temporário para fazer o download
        const link = document.createElement('a');
        link.download = 'placar-campeonato.png'; // Nome do arquivo
        link.href = canvas.toDataURL('image/png'); // Converte o canvas para PNG
        link.click(); // Simula o clique no link para baixar
    });
});

// Atualiza a pré-visualização assim que a página carrega
atualizarPrevia();

// Atualiza a pré-visualização toda vez que o usuário digita no textarea
inputText.addEventListener('input', atualizarPrevia);