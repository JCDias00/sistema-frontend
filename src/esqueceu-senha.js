window.onload = function (e) {

    var txtEmail = document.getElementById("txtEmail");

    var btnEsqueceuSenha = document.getElementById("btnEsqueceu-Senha");

    txtEmail.focus();

    btnEsqueceuSenha.onclick = function (e) {

        e.preventDefault();

        var Email = txtEmail.value;


        

        if (Email == "") {

            var mensagem = "E-mail obrigatório!";

            exibirMensagemErro(mensagem);
        }

        else {

            enviarEmail(Email);
        }

        
    }

    function enviarEmail(Email) {

        var data = JSON.stringify({
            "Email": Email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    "E-mail enviado com sucesso!";
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44348/api/usuario/esqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {

            spnErro.style.display = "none";
        }, 5000);
    }
}