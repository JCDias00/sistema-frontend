window.onload = function (e) {



    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtnome = document.getElementById("txtnome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtSenha = document.getElementById("txtSenha");



    txtnome.focus();


    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtnome.value;

        var Sobrenome = txtSobrenome.value;

        var Email = txtEmail.value;

        var telefone = txtTelefone.value;

        var Genero = slcGenero.value;

        var Senha = txtSenha.value;


        if (nome == "" ||
            Sobrenome == "" ||
            Senha == "" ||
            telefone == "" ||
            Email == "" ||
            Genero == "") {

            var mensagem = "Os campos acima são obrigatórios!";

            exibirMensagemErro(mensagem);
        }


        else {
            cadastrar(nome, Sobrenome, Email, telefone, Genero, Senha);
        }


    };



    function cadastrar(nome, Sobrenome, Email, telefone, Genero, Senha) {

        var data = JSON.stringify({
            "nome": nome,
            "Sobrenome": Sobrenome,
            "Email": Email,
            "telefone": telefone,
            "Genero": Genero,
            "Senha": Senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);
                    window.location.href = "home.html";

                }
                else {
                    exibirMensagemErro(loginResult.mensagem);
                }

                    
                   

                

            }
        });

        xhr.open("POST", "https://localhost:44348/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);


    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);


    }

}