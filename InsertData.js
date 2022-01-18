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

// const addPokemon = async function (id, name, height, weight, type) {
//     const query_type = `SELECT id FROM pokemon_type WHERE TYPE = '${type}'`;
//     let typeData = await sequelize.query(query_type)
//     let type_id = typeData[0][0].id
//     if(!type_id) return;

//     let query =`INSERT INTO Pokemon VALUES ('${id}', '${name}', ${height}, ${weight}, ${type_id})`
//     let result = await sequelize.query(query)
//     return result[0]
// }

const addPokemonTrainerLink = async function (pokemonId, trainerName) {

    let trainerData = await sequelize.query(`SELECT id FROM trainer WHERE name = '${trainerName}'`)
    let trainerID = trainerData[0][0].id //remember tha we receive both an array of results and our metadata, hence the [0][0]

    //validating both student and teacher exist
    if (!(pokemonId && trainerID)) { return }
    
    sequelize.query(`INSERT INTO pokemon_trainer VALUES (${pokemonId}, ${trainerID})`)
}

// const addTown = async function (name) {
//     let insertTownQuery =`INSERT INTO town VALUES (null, '${name}')`;
//     let result = await sequelize.query(insertTownQuery);
//     return result[0]
// }

// const addPokemonType = async function (type) {
//     let insertTypeQuery =`INSERT INTO pokemon_type VALUES (null, '${type}')`;
//     let result = await sequelize.query(insertTypeQuery);
//     return result[0]
// }

// const addTrainer = async function (name , town) {
//     const query_town = `SELECT id FROM town WHERE name = '${town}'`;
//     let townData = await sequelize.query(query_town)
//     let townId = townData[0][0].id
//     if(!townId) return;
//     let insertTrainerQuery =`INSERT INTO Trainer VALUES (null, '${name}' , '${townId}')`;
//     let result = await sequelize.query(insertTrainerQuery);
//     return result[0]
// }


// let types = new Set()

// data.forEach(pokemon => {
//     types.add(pokemon.type)
// })

// types.forEach(type => {
//     addPokemonType(type)
// })


// let towns = new Set()

// data.forEach(pokemon => {
//     pokemon.ownedBy.forEach(trainer =>{
//         towns.add(trainer.town)
//     })
// })

// towns.forEach(town => {
//     addTown(town)
// })

// let trainerData = new Set()

// data.forEach(pokemon => {
//     pokemon.ownedBy.forEach(trainer => {
//         let flag = 1
//         trainerData.forEach(data => {
//             if(data.name === trainer.name){
//                flag = 0
//             }
//         })
//         if (flag){   
//             trainerData.add({name:trainer.name , town:trainer.town})
//         }
//     })
// });


// trainerData.forEach(trainer => {
//         addTrainer(trainer.name , trainer.town)
// });

// data.forEach(pokemon => {
//     addPokemon(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.type)
// })

// data.forEach(pokemon => {
//     pokemon.ownedBy.forEach(trainer => {
//         addPokemonTrainerLink(pokemon.id , trainer.name)
//     })
// })