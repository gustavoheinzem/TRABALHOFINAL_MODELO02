function validaEntrada(args) {
  for (let i = 0; i < arguments.length; i++) {
    if (!!arguments[i] == false || arguments[i] < 0) {
      return false;
    }
  }
  return true;
}


function createMessage(msg, type) {
  document
    .querySelector("body")
    .insertAdjacentHTML("beforebegin", `<div class='message ${type}'>${msg}</div>`);

  setTimeout(function () {
    deleteMessage();
  }, 3000);
}

function deleteMessage() {
  const list = document.querySelectorAll(".message");
  for (const item of list) {
    item.remove();
  }
}

function verificarIMC(imc) {
  if (imc < 17) {
    createMessage("Muito abaixo do peso", "alert")
  } else if (imc > 17 && imc <= 18.49){
    createMessage("Abaixo do peso", "warning")
  } else if (imc >= 18.5 && imc <= 24.99){
    createMessage("Peso normal", "sucess")
  } else if (imc >= 25 && imc <= 29.99){
    createMessage("Acima do peso", "warning")
  } else if (imc >= 30 && imc <= 34.99){
    createMessage("Obesidade I", "alert")
  } else {
    createMessage("Obesidade II", "danger")
  }
}
function calcularIMC(kilos, altura) {
  altura = altura / 100;
  return (kilos / (altura * altura));
}

const formCalcularIMC = document.getElementById('form');

formCalcularIMC.addEventListener('submit', function(event) {
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
function calculateIMC(kilos, altura) {
  // Calcular IMC
  const heightMeters = altura / 100;
  return kilos / (heightMeters * heightMeters);
}

function calculatePricesA(Idade, imc) {
  // Regras de Negócio Operadora A
  const basic = 100 + (Idade * 10 * (imc / 10));
  const standard = (150 + (Idade * 15)) * (imc / 10);
  const premium = (200 - (imc * 10) + (Idade * 20)) * (imc / 10);

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

function comparePlans() {
  // Obter dados do formulário
  const Idade = parseInt(document.getElementById('Idade').value);
  const kilos = parseFloat(document.getElementById('kilos').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const imc = calculateIMC(kilos, altura);

  // Calcular preços para ambas as operadoras
  const resultA = calculatePricesA(Idade, imc);
  const resultB = calculatePricesB(imc);
  
const comparisonResult = comparePlansTotalCost(resultA, resultB);

const userData = { Idade, kilos, altura, imc };

 // Exibir resultado em uma tabela
 const resultadoHTML = `
    <table>
      <tr>
        <th>Plano</th>
                 <th>Plano</th>
                 <th>Operadora A</th>
                 <th>Operadora B</th>
             </tr>
         </thead>
         <tbody>
             <tr>
             </tr>
             <tr>
               <td>Básico</td>
               <td>${operadoraA.basico.toFixed(2)} R$</td>
               <td>${operadoraB.basico.toFixed(2)} R$</td>
             </tr>
             <tr>
               <td>Standard</td>
               <td>${operadoraA.standard.toFixed(2)} R$</td>
               <td>${operadoraB.standard.toFixed(2)} R$</td>
             </tr>
             <tr>
               <td>Premium</td>
               <td>${operadoraA.premium.toFixed(2)} R$</td>
               <td>${operadoraB.premium.toFixed(2)} R$</td>
             </tr>
           </table>
         `;
       
         document.getElementById('resultado').innerHTML = resultadoHTML;
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

