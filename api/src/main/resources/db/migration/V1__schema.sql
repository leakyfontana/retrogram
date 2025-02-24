CREATE TABLE IF NOT EXISTS image (
    id BIGSERIAL PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    media_type VARCHAR(100),
    uploaded_at TIMESTAMP NOT NULL,
    location VARCHAR(255)
);