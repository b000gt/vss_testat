DROP TABLE IF EXISTS face;
CREATE TABLE face(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INT NOT NULL
);