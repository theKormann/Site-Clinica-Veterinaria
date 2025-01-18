document.getElementById("form-wpp").addEventListener("submit", async function (event) {
    event.preventDefault();

    const clienteNome = document.getElementById("clienteNome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const setor = document.getElementById("setor").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const queixaPrincipal = document.getElementById("queixaPrincipal").value;
    const dataHoraConsulta = `${data}T${hora}:00`;
    const tipoConsulta = document.getElementById("tipoConsulta").value;

    // Objeto do agendamento
    const agendamento = {
        tipoConsulta: tipoConsulta,
        clienteNome: clienteNome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        setor: setor,
        dataHoraConsulta: dataHoraConsulta,
        queixaPrincipal: queixaPrincipal,
        valorConsulta: 1.00,
    };

    try {
        // 1. Verifica se o horário já está ocupado para o mesmo setor
        const verificarResponse = await fetch("http://localhost:8080/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento),
        });

        const verificarResult = await verificarResponse.json();
        if (verificarResult && verificarResult.agendado && setor === verificarResult.setor) {
            throw new(`O horário já está ocupado no setor selecionado.`);
        }

        // 2. Recebe a resposta de sucesso e continua com o pagamento
        const pagamentoResponse = await fetch("http://localhost:8080/pagamentos/criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento),
        });

        if (!pagamentoResponse.ok) {
            const errorText = await pagamentoResponse.text();
            throw new Error(`Erro ao criar pagamento: ${errorText}`);
        }

        const { url } = await pagamentoResponse.json();
        window.location.href = url; // Redireciona para o Stripe

    } catch (error) {
        console.error("Erro:", error);
        alert(error.message); // Exibe o erro ao usuário
    }
});
