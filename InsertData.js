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

// const addPokemon = async function (id, name, height, weight, type_id) {
//     // let selectTypeQuery = `SELECT FROM pokemon_type WHERE id=${type_id}`
//     // let selectType = await sequelize.query(selectTypeQuery);
//     // if(!selectType || selectType.length < 1) return "pokemon type not exist";

//     let query =`INSERT INTO Pokemon VALUES ('${id}', '${name}', ${height}, ${weight}, ${type_id})`
//     let result = await sequelize.query(query)
//     return result[0]
// }

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

const addTrainer = async function (name , town) {
    const query_town = `SELECT id FROM town WHERE name = '${town}'`;
    let townData = await sequelize.query(query_town)
    console.log(townData);
    let town_id = townData[0][0].id
    if(!town_id) return;
    let insertTrainerQuery =`INSERT INTO Trainer VALUES (null, '${name}' , '${town_id}')`;
    let result = await sequelize.query(insertTrainerQuery);
    return result[0]
}


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

let trainerData = new Set()

data.forEach(pokemon => {
    pokemon.ownedBy.forEach(trainer => {
        trainerData.add({name:trainer.name , town:trainer.town})
    })
});


trainerData.forEach(trainer => {
        addTrainer(trainer.name , trainer.town)
});

data.forEach(pokemon => {
    // .then((type_id)=>{
    //     addPokemon(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, type_id)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // pokemon.ownedBy.forEach(trainer =>{
    //     addTown(trainer.town).then((town_id) => {
    //         addTrainer(trainer.name, town_id)
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // })
})