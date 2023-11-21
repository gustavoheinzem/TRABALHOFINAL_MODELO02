formCalcularIMC.addEventListener('submit', function (event) {
    event.preventDefault();

    const kilos = parseFloat(document.getElementById('kilos').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (validaEntrada(kilos, altura)) {
        const imc = calcularIMC(kilos, altura);
        document.getElementById('imc').value = parseFloat(imc).toFixed(2);
        verificarIMC(imc);
    } else {
        document.getElementById('imc').value = "## ERRO ##";
    }
});
