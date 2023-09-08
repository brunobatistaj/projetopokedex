const pokemonName = document.querySelector('.pk_name')
const pokemonNumber = document.querySelector('.pk_number')
const pokemonImage = document.querySelector('.pokemon')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const prev = document.querySelector('.btn_prev')
const next = document.querySelector('.btn_next')

let searchPokemon = 1

const findPokemon = async (pokemon) => { //assincrona - retorna promise
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status === 200){
        const dados = await apiResponse.json()
        return dados//verifica se numero ou nome digitado é true
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    
    const dados = await findPokemon(pokemon)//retorna rseposta da api
    
    if(dados){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = dados.name//name é a chave da api que retorna o nome
        pokemonNumber.innerHTML = dados.id//id retorna numero conforme api
        pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = dados.id
        input.value = ''
    }else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()//padrao form
    renderPokemon(input.value.toLowerCase())//valor sempre minusculo
})

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -=1
        renderPokemon(searchPokemon)
    }
})
next.addEventListener('click', () => {
    searchPokemon +=1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)