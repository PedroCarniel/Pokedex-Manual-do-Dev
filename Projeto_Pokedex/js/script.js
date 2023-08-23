const nomePokemon = document.querySelector('.pokemon_nome');
const numeroPokemon = document.querySelector('.pokemon_numero');
const pokemonImagem = document.querySelector('.pokemon_imagem');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnprev = document.querySelector('.btn-prev');
const btnnext = document.querySelector('.btn-next');

let procuraPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResposta.status == 200) {
    const data =  await APIResposta.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Carregando'

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImagem.style.display = 'block';
        nomePokemon.innerHTML = data.name;
        numeroPokemon.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        procuraPokemon = data.id;
    }
    else {
        pokemonImagem.style.display = 'none';
        nomePokemon.innerHTML = 'Não encontrado';
        numeroPokemon.innerHTML = '';
    }

    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


btnprev.addEventListener('click', () => {
    if (procuraPokemon > 1)
    procuraPokemon -= 1;
    renderPokemon(procuraPokemon);
});

btnnext.addEventListener('click', () => {
    procuraPokemon += 1;
    renderPokemon(procuraPokemon);
});
renderPokemon(procuraPokemon);
