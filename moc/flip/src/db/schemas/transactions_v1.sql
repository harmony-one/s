CREATE TABLE transactions_v1 (
    id SERIAL PRIMARY KEY,
    is_executed BOOLEAN NOT NULL DEFAULT FALSE,
    address VARCHAR(255),
    src_chain VARCHAR(100),
    src_hash VARCHAR(255),
    dst_chain VARCHAR(100),
    dst_hash VARCHAR(255),
    asset VARCHAR(100),
    amount VARCHAR(100),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
