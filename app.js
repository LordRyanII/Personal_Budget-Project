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
		return Number(proximoId) + 1
	}

	gravar(itens) { //recebe os dados da variavél 'despesa'
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(itens))

		localStorage.setItem('id', id)

	}
  recuperarTodosRegistros(){
//Array de despesa
  let despesas = Array()
  let pegaId = localStorage.getItem('id')

//Recupera todas as despesas no localStorage
    for(let i = 1; i <= pegaId; i++){
      //Recupera a despesa

      let despesa = JSON.parse(localStorage.getItem(i))
      //Verifica se há valores removidos
      if(despesa === null){
        continue  
      } else{
        despesas.push(despesa)
      }
    }
    return despesas
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
  let alert_bottom = document.querySelector('#Alert_btn')
  let alert_div = document.querySelector('#div_alertaTitulo')
  let alert_titulo = document.querySelector('#alerta_titulo')
  let alert_resultado = document.querySelector('#alerta_Conteudo')
  
  let despesa = new Despesa(
    ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value) 

//Validar dados
  if(despesa.validarDados() === true){

    bd.gravar(despesa)
    alert_div.className =  'modal-header text-success'
    alert_titulo.innerHTML = 'Sucesso na gravação' 
    alert_resultado.innerHTML = 'Registros inseridos com Sucesso. Despesa foi cadastrada com sucesso.'
    alert_bottom.className = 'btn btn-success'
    alert_bottom.innerHTML = 'Ok!' 
    //Jquery
    $('#alertaRegistraDespesa').modal('show')

    //limpa os espaços
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value  = ''
    valor.value = ''
    
    
  } else {

    alert_div.className =  'modal-header text-danger'
    alert_titulo.innerHTML = 'Erro na gravação' 
    alert_resultado.innerHTML = 'Erro na gravação. Verifique se todos os campos foram preenchidos corretamente.'
    alert_bottom.className = 'btn btn-danger'
    alert_bottom.innerHTML = 'Voltar e corrigir'
    
    //Jquery
    $('#alertaRegistraDespesa').modal('show')
  }
  
}

//Function Responsavél por exibir o resultado (PESQUISA )

function carregaListaDespesa(){

  let tabela = document.querySelector('#listaDespesa')
  let despesas = Array()
  despesas = bd.recuperarTodosRegistros()

  //Percorrendo o array
  despesas.forEach((indice) => {
    console.log(indice)

    //Cria a linha (tr)
    let linha = tabela.insertRow()

    //Criar as colunas (td)

    linha.insertCell(0).innerHTML = `${indice.dia}/${indice.mes}/${indice.ano}`
    linha.insertCell(1).innerHTML = `${indice.tipo}`
    linha.insertCell(2).innerHTML = `${indice.descricao}`
    linha.insertCell(3).innerHTML = 'R$' + `${indice.valor}`

  })
}
