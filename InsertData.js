const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/pokecorp')

const data = require('./poke_data.json')

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

const addPokemon = async function (id, name, height, weight, type) {
    const query_type = `SELECT id FROM pokemon_type WHERE Type = '${type}'`;
    let typeData = await sequelize.query(query_type)
    let type_id = typeData[0][0].id
    if(!type_id) return;

    let query =`INSERT INTO Pokemon VALUES ('${id}', '${name}', ${height}, ${weight}, ${type_id})`
    let result = await sequelize.query(query)
    return result[0]
}

const addPokemonTrainerLink = async function (pokemonId, trainerName) {

    let trainerData = await sequelize.query(`SELECT id FROM trainer WHERE name = '${trainerName}'`)
    let trainerID = trainerData[0][0].id
    if (!(pokemonId && trainerID)) { return }
    
    sequelize.query(`INSERT INTO pokemon_trainer VALUES (${pokemonId}, ${trainerID})`)
}

const addTown = async function (name) {
    let insertTownQuery =`INSERT INTO town VALUES (null, '${name}')`;
    let result = await sequelize.query(insertTownQuery);
    return result[0]
}

const addPokemonType = async function (type) {
    let insertTypeQuery =`INSERT INTO pokemon_type VALUES (null, '${type}')`;
    let result = await sequelize.query(insertTypeQuery);
    return result[0]
}

const addTrainer = async function (name , town) {
    const query_town = `SELECT id FROM town WHERE name = '${town}'`;
    let townData = await sequelize.query(query_town)
    let townId = townData[0][0].id
    if(!townId) return;
    let insertTrainerQuery =`INSERT INTO Trainer VALUES (null, '${name}' , '${townId}')`;
    let result = await sequelize.query(insertTrainerQuery);
    return result[0]
}

const findHeaviestPokemon = async function () {
    const HeaviestQuery = `SELECT P_name FROM pokemon WHERE P_weight =(SELECT MAX(P_weight) FROM pokemon)`;
    let HeaviestPokemonData = await sequelize.query(HeaviestQuery)
    let HeaviestPokemonName = HeaviestPokemonData[0][0].P_name
    if(!HeaviestPokemonName) return;
    return HeaviestPokemonName
}

const findByType = async function (type) {
    const findByTypeQuery = `SELECT P_name FROM pokemon WHERE P_type_id =(SELECT id FROM pokemon_type WHERE Type = '${type}')`;
    let samePokemonTypeData = await sequelize.query(findByTypeQuery)
    let samePokemonTypeArray = samePokemonTypeData[0]
    if(!samePokemonTypeArray.length) return;
    return samePokemonTypeArray
}

const findOwners = async function (pokemonName) {
    const findOwnersQuery = `SELECT trainer.name FROM pokemon_trainer JOIN pokemon JOIN trainer ON pokemon_trainer.p_id = pokemon.p_id AND pokemon_trainer.tr_id = trainer.id WHERE pokemon.p_name = '${pokemonName}'`;
    let ownersData = await sequelize.query(findOwnersQuery).catch(err=>{console.log(err);})
    let ownersArray = ownersData[0]
    if(!ownersArray.length) return;
    return ownersArray
}

const findRoster = async function (ownerName) {
    const findByPokemonQuery = `SELECT p_name FROM pokemon_trainer JOIN pokemon JOIN trainer ON pokemon_trainer.p_id = pokemon.p_id AND pokemon_trainer.tr_id = trainer.id WHERE trainer.name = '${ownerName}'`;
    let pokemonsOfOwnerData = await sequelize.query(findByPokemonQuery).catch(err=>{console.log(err);})
    let pokemonsOfOwnerArray = pokemonsOfOwnerData[0]
    if(!pokemonsOfOwnerArray.length) return;
    return pokemonsOfOwnerArray
}

const convertPokemonTypeToSQL = function(){
    let types = new Set()
    
    data.forEach(pokemon => {
        types.add(pokemon.type)
    })
    
    types.forEach(type => {
        addPokemonType(type)
    })
}

const convertTrainerTownToSQL = function(){
    let towns = new Set()

    data.forEach(pokemon => {
        pokemon.ownedBy.forEach(trainer =>{
            towns.add(trainer.town)
        })
    })

    towns.forEach(town => {
        addTown(town)
    })
}

const convertTrainerToSQL = function(){
    let trainerData = new Set()

    data.forEach(pokemon => {
        pokemon.ownedBy.forEach(trainer => {
            let flag = 1
            trainerData.forEach(data => {
                if(data.name === trainer.name){
                    flag = 0
                }
            })
            if (flag){   
                trainerData.add({name:trainer.name , town:trainer.town})
                addTrainer(trainer.name , trainer.town)
            }
        })
    });
}


const convertPokemonDataToSQL = function(){
    data.forEach(pokemon => {
        addPokemon(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.type)
    })
}

const connectPokemonAndTrainer = function(){
    data.forEach(pokemon => {
        pokemon.ownedBy.forEach(trainer => {
            addPokemonTrainerLink(pokemon.id , trainer.name)
        })
    })
}

// convertPokemonTypeToSQL();
// convertTrainerTownToSQL();
// convertTrainerToSQL();
// convertPokemonDataToSQL();
// connectPokemonAndTrainer();

// findHeaviestPokemon().then(res => {
//     console.log(res);
// })

// findByType("grass").then(res => {
//     console.log(res);
// })

// findOwners("gengar").then(res => {
//     console.log(res);
// })

findRoster("Loga").then(res => {
    console.log(res);
})