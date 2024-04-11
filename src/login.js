window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var Email = txtEmail.value;

        var Senha = txtSenha.value;

        if (Email == "") {
            exibirMensagemErro("Informe o Email.");
        }
        else if (Senha == "") {
            exibirMensagemErro("Informe a Senha.");
        }

        else {
            realizarLogin(Email, Senha);
        }


        function exibirMensagemErro(mensagem) {

            var spnErro = document.getElementById("spnErro");

            spnErro.innerText = mensagem;

            spnErro.style.display = "block";

            setTimeout(function () {
                spnErro.style.display = "none";
            }, 5000);

        }

        function realizarLogin(Email, Senha) {

            var login = {
                "Email": Email,
                "Senha": Senha
            };

            var data = JSON.stringify(login);

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var loginResult = JSON.parse(this.responseText);

                    if (loginResult.sucesso) {
                        
                        localStorage.setItem("usuarioGuid", loginResult.usuarioGuid);

                        window.location.href = "home.html";
                    }
                    else {
                        exibirMensagemErro(loginResult.mensagem);
                    }
                }
            });

            xhr.open("POST", "https://localhost:44348/api/usuario/login");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }


    }

}


