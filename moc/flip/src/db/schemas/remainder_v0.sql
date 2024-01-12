CREATE TABLE remainder (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    chain VARCHAR(100),
    tx_hash VARCHAR(255),
    asset VARCHAR(100),
    total_amount VARCHAR(255),
    sent_amount VARCHAR(255),
    remainder VARCHAR(255),
    remainder_value VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);