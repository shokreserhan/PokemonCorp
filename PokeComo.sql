USE pokecorp;

-- CREATE TABLE Town (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30)
-- );

-- CREATE TABLE Pokemon_Type (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     TYPE VARCHAR(30)
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