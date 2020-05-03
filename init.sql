DROP TABLE IF EXISTS total_clicks;
CREATE TABLE total_clicks(
    id SERIAL PRIMARY KEY,
    amount INT
);

DROP TABLE IF EXISTS face;
CREATE TABLE face(
    id SERIAL PRIMARY KEY,
    amount INT UNIQUE,
    name VARCHAR(255)
);

INSERT INTO total_clicks (amount) VALUES (0);
INSERT INTO face (amount, name) VALUES (1, 'marc.jpg');