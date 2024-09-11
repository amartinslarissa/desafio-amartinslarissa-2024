class RecintosZoo {
  constructor() {
    // Definição dos recintos
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { 'MACACO': 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { 'GAZELA': 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { 'LEAO': 1 } }
    ];

    // Definição dos animais
    this.animais = {
      'LEAO': { tamanho: 3, bioma: 'savana' },
      'LEOPARDO': { tamanho: 2, bioma: 'savana' },
      'CROCODILO': { tamanho: 3, bioma: 'rio' },
      'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
      'GAZELA': { tamanho: 2, bioma: 'savana' },
      'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' }
    };
}

analisaRecintos(animal, quantidade) {
    const erro = this.validarEntrada(animal, quantidade);
    if (erro) {
      return { erro };
    }

    const animalInfo = this.animais[animal.toUpperCase()];
    if (!animalInfo) {
      return { erro: "Animal inválido" };
    }

    let recintosViaveis = [];
    this.recintos.forEach(recinto => {
      if (this.podeAdicionarAnimal(recinto, animalInfo, quantidade)) {
        const espacoLivre = recinto.tamanhoTotal - this.calcularEspacoOcupado(recinto, animalInfo, quantidade);
        recintosViaveis.push(Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal}));
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis: recintosViaveis.sort((a, b) => a.localeCompare(b)) };
}

validarEntrada(animal, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return "Quantidade inválida";
    }
    if (!this.animais[animal.toUpperCase()]) {
      return "Animal inválido";
    }
    return null;
}

podeAdicionarAnimal(recinto, animalInfo, quantidade) {
    const biomasAceitos = animalInfo.bioma.split(' ou ');
    if (!biomasAceitos.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
      return false;
    }

    const tamanhoNecessario = quantidade * animalInfo.tamanho;
    const animaisExistentes = recinto.animaisExistentes;

    // Verifica se o recinto é adequado para animais carnívoros
    if (this.eAnimalCarnivoro(animalInfo)) {
      if (Object.keys(animaisExistentes).some(esp => this.eAnimalCarnivoro(this.animais[esp]))) {
        return false;
      }
    }

    // Verifica se o recinto é adequado para macacos
    if (animalInfo.bioma.includes('savana') && quantidade > 1 && Object.keys(animaisExistentes).length === 0) {
      return false;
    }

    // Verifica se o recinto é adequado para hipopótamos
    if (animalInfo.bioma.includes('savana') && animalInfo.bioma.includes('rio') && recinto.bioma !== 'savana e rio') {
      return false;
    }

    const espacoDisponivel = recinto.tamanhoTotal - this.calcularEspacoOcupado(recinto, animalInfo, quantidade);
    return tamanhoNecessario <= espacoDisponivel;
}

eAnimalCarnivoro(animalInfo) {
  return ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animalInfo.bioma);
}

calcularEspacoOcupado(recinto, animalInfo, quantidade) {
  const animaisExistentes = recinto.animaisExistentes;
  let espacoOcupado = 0;

  for (const [esp, qnt] of Object.entries(animaisExistentes)) {
    const info = this.animais[esp];
    if (info) {
      espacoOcupado += info.tamanho * qnt;
      if (esp !== animalInfo.bioma) {
        espacoOcupado += 1; // Espaço extra se houver mais de uma espécie
      }
    }
  }
  espacoOcupado += animalInfo.tamanho * quantidade;
  if (quantidade > 1) {
    espacoOcupado += 1; // Espaço extra para mais de um animal
  }
  return espacoOcupado;
  }
}

module.exports = RecintosZoo;



