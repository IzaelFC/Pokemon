async function index(){
    var numero = document.getElementById('numero').value

    //O await dentro do parenteses serve para fazer a requisição, depois que é feita passa para o await de fora para transformar em json
    const site = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)).json()
    var name = site['name']
    //Gif var imagem = site['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    var imagem = site['sprites']['front_default']

    var nome = document.getElementById('pokemon')
    nome.innerHTML = name[0].toUpperCase() + name.substring(1)
    document.getElementById('foto').src = imagem

    //console.log("Nome: " + name)
    //console.log("Imagem: " + imagem)
    habilidade1(numero)
}


async function habilidade1(nome_pokemon){
    const site = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)).json()
    var habilidade1 = site['abilities'][0]['ability']['url']
    var habilidade1 = await(await fetch(habilidade1)).json()

    var nome = habilidade1['name'][0].toUpperCase() + habilidade1['name'].substring(1)
    var descricao = await habilidade1['effect_entries'][0]['effect']

    document.getElementById('habilidade1').innerHTML = nome
    document.getElementById('descricao').innerHTML = descricao

    document.getElementById('textoP').innerHTML = 'O nome do pokémon é:'

    document.getElementById('h2Golpes').innerHTML = 'Golpes'
    document.getElementById('h2Tipo').innerHTML = 'Tipo(s)'

    moves(nome_pokemon)

    //console.log(`Habilidade: ${habilidade1['name']}`)
}


async function moves(nome_pokemon){
    const site = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)).json()
    var movelist = []
    
    for (var item in site['moves']){
        movelist.push(site['moves'][item]['move']['name'])
    }

    var listaMove = document.getElementById('golpes')

    //listaMove.innerHTML = "<h2>Golpes</h2>"
    for (var item = 0; item < movelist.length; item++){
        listaMove.innerHTML += `<li>${movelist[item]}</li>`
    }

    tipo(nome_pokemon)
    //console.log("\nAtaques: ", movelist.sort(), "\n")
    //console.log(`Numero de ataques = ${movelist.length}`)
}


async function tipo(nome_pokemon){
    const site = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)).json()
    var typelist = []

    for (var item in site['types']){
        typelist.push(site['types'][item]['type']['name'])
    }

    var listaTipo = document.getElementById('tipos')

    //listaTipo.innerHTML = "<h2>Tipo(s)</h2>"
    for (var item = 0; item < typelist.length; item++){
        listaTipo.innerHTML += `<li>${typelist[item]}</li>`
    }
}