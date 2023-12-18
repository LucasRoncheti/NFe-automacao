let x = () => {
    const form = document.getElementById("formCadastroProdutor");

    if (!form) {
        console.error("Form element not found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // selecionar inputs 
        const numeroInput = form.querySelector("numero").value;
        const produtorRuralInput = form.querySelector("nome").value;
        const loginInput = form.querySelector("login").value;
        const senhaInput = form.querySelector("senha").value;

        fetch("php/cadastrarProdutorRural.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: new URLSearchParams({ numeroInput, produtorRuralInput, loginInput, senhaInput })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            form.reset();
        })
        .catch(error => console.error(error));
    });
}
