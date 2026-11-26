
let senhaSecreta = Math.floor(Math.random() * 50) + 1;

let tentativas = 0;

const limiteTentativas = 7;

let jogoFinalizado = false;

function verificarSenha() {

    if (jogoFinalizado) {
        return;
    }

    const campo = document.getElementById("numero");
    const mensagem = document.getElementById("mensagem");
    const contador = document.getElementById("tentativas");

    const palpite = Number(campo.value);

    // Verifica se o número é válido
    if (
        campo.value === "" ||
        !Number.isInteger(palpite) ||
        palpite < 1 ||
        palpite > 50
    ) {

        mensagem.innerText =
            "Digite um número válido entre 1 e 50!";

        mensagem.className = "erro";

        return;
    }

    // Conta a tentativa
    tentativas++;

    contador.innerText =
        "Tentativas: " + tentativas + " / " + limiteTentativas;

    // Se acertar
    if (palpite === senhaSecreta) {

        mensagem.innerText = "Parabéns! Você abriu o cofre!";

        mensagem.className = "sucesso";

        document.getElementById("cofre").src =
            "imagens/cofreaberto.png";

        document.getElementById("cofre").alt =
            "Cofre lilás aberto";

        document.getElementById("resultado").innerText =
            "🎉 Cofre desbloqueado!";

        document.getElementById("detalhes").innerText =
            "Você descobriu a senha " + senhaSecreta +
            " em " + tentativas + " tentativa(s)!";

        finalizarJogo();

    }

    // Se errar
    else {

        if (palpite < senhaSecreta) {

            mensagem.innerText =
                "Senha incorreta! Tente um número MAIOR.";

        } else {

            mensagem.innerText =
                "Senha incorreta! Tente um número MENOR.";

        }

        mensagem.className = "erro";

        campo.value = "";

        campo.focus();

        // Se acabarem as tentativas
        if (tentativas >= limiteTentativas) {

            document.getElementById("resultado").innerText =
                "😢 Fim de jogo!";

            document.getElementById("detalhes").innerText =
                "Suas tentativas acabaram! A senha era " +
                senhaSecreta + ".";

            finalizarJogo();

        }
    }
}

function finalizarJogo() {

    jogoFinalizado = true;

    document.getElementById("overview").classList.add("ativo");

    document.getElementById("numero").disabled = true;

    document.getElementById("botao").disabled = true;

}

function reiniciarJogo() {

    senhaSecreta = Math.floor(Math.random() * 50) + 1;

    tentativas = 0;

    jogoFinalizado = false;

    document.getElementById("numero").value = "";

    document.getElementById("numero").disabled = false;

    document.getElementById("botao").disabled = false;

    document.getElementById("cofre").src =
        "imagens/cofr.png";

    document.getElementById("mensagem").innerText = "";

    document.getElementById("mensagem").className = "";

    document.getElementById("tentativas").innerText =
        "Tentativas: 0 / 7";

    document.getElementById("overview").classList.remove("ativo");

    document.getElementById("numero").focus();

}

// Permite apertar ENTER para verificar a senha
document.getElementById("numero").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        verificarSenha();
    }

});
