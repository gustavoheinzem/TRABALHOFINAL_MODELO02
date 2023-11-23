function comparePlans() {
    // Obter dados do formulário
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const imc = calculateIMC(weight, height);

    // Calcular preços para ambas as operadoras
    const resultA = calculatePricesA(age, imc);
    const resultB = calculatePricesB(imc);

    // Comparar planos
    const comparisonResult = comparePlansTotalCost(resultA, resultB);

    // Armazenar os dados para possível uso futuro
    const userData = { age, weight, height, imc };

    // Exibir resultado em uma tabela
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <h4>Resultado da Comparação:</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Plano</th>
                    <th>Operadora A</th>
                    <th>Operadora B</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Básico</td>
                    <td>${resultA.basic.toFixed(2)}</td>
                    <td>${resultB.basic.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Standard</td>
                    <td>${resultA.standard.toFixed(2)}</td>
                    <td>${resultB.standard.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Premium</td>
                    <td>${resultA.premium.toFixed(2)}</td>
                    <td>${resultB.premium.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <p class="mt-3">O plano mais vantajoso é o <strong>${comparisonResult}</strong>.</p>
    `;

    // Armazenar os dados do usuário para possível uso futuro
    console.log("Dados do usuário:", userData);
}

function comparePlansTotalCost(resultA, resultB) {
    const totalCostA = resultA.basic + resultA.standard + resultA.premium;
    const totalCostB = resultB.basic + resultB.standard + resultB.premium;

    if (totalCostA < totalCostB) {
        return "Operadora A";
    } else if (totalCostB < totalCostA) {
        return "Operadora B";
    } else {
        return "Ambas as operadoras têm o mesmo custo total.";
    }
}


function calculateIMC(weight, height) {
    // Calcular IMC
    const heightMeters = height / 100;
    return weight / (heightMeters * heightMeters);
}

function calculatePricesA(age, imc) {
    // Regras de Negócio Operadora A
    const basic = 100 + (age * 10 * (imc / 10));
    const standard = (150 + (age * 15)) * (imc / 10);
    const premium = (200 - (imc * 10) + (age * 20)) * (imc / 10);

    return { basic, standard, premium };
}

function calculatePricesB(imc) {
    // Fator de comorbidade Operadora B
    let comorbidityFactor;

    if (imc < 17) {
        comorbidityFactor = "Muito abaixo do peso";
    } else if (imc < 18.5) {
        comorbidityFactor = "Abaixo do peso";
    } else if (imc < 25) {
        comorbidityFactor = "Peso normal";
    } else if (imc < 30) {
        comorbidityFactor = "Acima do peso";
    } else if (imc < 35) {
        comorbidityFactor = "Obesidade I";
    } else if (imc < 40) {
        comorbidityFactor = "Obesidade II";
    } else {
        comorbidityFactor = "Obesidade III";
    }

    // Regras de Negócio Operadora B
    const basic = 100 + (imc / 10);
    const standard = (150 + (imc / 10)) * 1.5;
    const premium = (200 - (imc * 10) + (imc / 10) * 2) * (imc / 10);

    return { basic, standard, premium, comorbidityFactor };
}

function comparePlansTotalCost(resultA, resultB) {
    const totalCostA = (resultA.basic + resultA.standard + resultA.premium).toFixed(2);
    const totalCostB = (resultB.basic + resultB.standard + resultB.premium).toFixed(2);

    if (totalCostA < totalCostB) {
        return "Operadora A";
    } else if (totalCostB < totalCostA) {
        return "Operadora B";
    } else {
        return "Ambas as operadoras têm o mesmo custo total.";
    }
}

