//Transforma as despesas em object
class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia 
    this.tipo = tipo
    this.valor = valor
    this.descricao = descricao
  }
  validarDados(){
    for(let indice in this){
      if(this[indice] === undefined || this[indice] === '' || this[indice] === null){
        return false
      } else {
        return true
      }
    }
  }
}

//Banco de dados que armazena o object no localStorage
class Banco {
  constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(itens) { //recebe os dados da variavél 'despesa'
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(itens))

		localStorage.setItem('id', id)

	}
}

let bd = new Banco()

//Evento onClick recebe os dados e envia para a classe
function cadastrarDespesa() {

  let ano = document.querySelector('#ano')
  let mes = document.querySelector('#mes')
  let dia = document.querySelector('#dia')
  let tipo = document.querySelector('#tipo')
  let valor = document.querySelector('#valor')
  let descricao = document.querySelector('#descricao')

  const despesa = new Despesa(
    ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value) 

//Validar dados
  if(despesa.validarDados() === true){
    //bd.gravar(despesa)
    
  } else {
    console.log('Error')
  }
  
}
