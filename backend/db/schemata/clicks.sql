DROP TABLE IF EXISTS total_clicks;
CREATE TABLE total_clicks(
    id SERIAL NOT NULL PRIMARY KEY,
    amount BIGINT DEFAULT 0,
    locked BOOLEAN DEFAULT true
);