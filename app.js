let listaDeNumerosSorteados = [];
let numeroLimite = 15;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
};

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Acerte qual o número secreto entre 1 e ' + numeroLimite);
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
};

function limparCampo() {
    document.querySelector('input').value = '';
    document.querySelector('input').focus();
};

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativas = tentativas === 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', 'Tente um número maior que ' + chute);
    } else {
        exibirTextoNaTela('p', 'Tente um número menor que ' + chute);
    };
    tentativas++;
    limparCampo();
};

