USE pokecorp;

-- CREATE TABLE Town (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30)
-- );

-- CREATE TABLE Pokemon_Type (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     Type VARCHAR(30)
-- );

-- CREATE TABLE Pokemon (
--     p_id INT(10) PRIMARY KEY,
--     p_name VARCHAR(30),
--     p_height INT(10),
--     p_weight INT(10),
--     p_type_id INT(10),
--     FOREIGN KEY(p_type_id) REFERENCES Pokemon_Type(id)
-- );

-- CREATE TABLE Trainer (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30),
--     town_id INT,
--     FOREIGN KEY(town_id) REFERENCES town(id)
-- );

-- CREATE TABLE Pokemon_Trainer (
--     p_id INT,
--     tr_id INT,
--     FOREIGN KEY(p_id) REFERENCES pokemon(p_id),
--     FOREIGN KEY(tr_id) REFERENCES trainer(id)
-- );

-- DELETE FROM pokemon_type;

-- SELECT p_name
-- FROM pokemon_trainer, pokemon, trainer
-- WHERE pokemon_trainer.p_id = pokemon.p_id AND pokemon_trainer.tr_id = trainer.id AND trainer.name = 'gengar';

SELECT trainer.name
FROM pokemon_trainer JOIN pokemon JOIN trainer
ON pokemon_trainer.p_id = pokemon.p_id AND pokemon_trainer.tr_id = trainer.id
WHERE pokemon.p_name = 'gengar';
    
-- SELECT 
--     item_purchased, amount, 
--     customer.name AS cust_name, -- aliasing
--     company.name AS comp_name
-- FROM 
--     transaction, 
--     customer, 
--     company
-- WHERE 
--     transaction.customer_id = customer.id AND
--     transaction.company_id = company.id;