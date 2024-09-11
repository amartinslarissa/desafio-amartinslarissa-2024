const RecintosZoo = require('./recintos-zoo.js.js');

const zoo = new RecintosZoo();

// Função para executar um teste e exibir o resultado
function executarTeste(animal, quantidade) {
  console.log(Teste: ${animal}, ${quantidade});
  const resultado = zoo.analisaRecintos(animal, quantidade);
  console.log(resultado);
}

// Executa testes
executarTeste('MACACO', 2);        // Deve retornar os recintos viáveis
executarTeste('UNICORNIO', 1);     // Deve retornar "Animal inválido"
executarTeste('LEAO', 1);          // Deve retornar os recintos viáveis com o LEAO
executarTeste('GAZELA', 2);        // Deve retornar "Não há recinto viável"
executarTeste('HIPOPOTAMO', 1);    // Deve retornar recintos viáveis com o HIPOPOTAMO
executarTeste('MACACO', 5);        // Deve retornar "Não há recinto viável"
executarTeste('LEOPARDO', 2);      // Deve retornar "Não há recinto viável"
executarTeste('CROCODILO', 1);     // Deve retornar recintos viáveis com o CROCODILO
executarTeste('MACACO', -1);       // Deve retornar "Quantidade inválida"
executarTeste('MACACO', 0);        // Deve retornar "Quantidade inválida"