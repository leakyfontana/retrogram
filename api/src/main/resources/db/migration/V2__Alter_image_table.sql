-- V2__Alter_image_table.sql

-- Add the new column for binary data
ALTER TABLE image
ADD COLUMN image_data BYTEA NOT NULL;

-- Remove the old file_path column
ALTER TABLE image
DROP COLUMN file_path;