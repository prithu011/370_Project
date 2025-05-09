-- First drop any foreign key constraints referencing User_id
ALTER TABLE owner_user_info
DROP FOREIGN KEY IF EXISTS user_id;

-- Remove User_id from primary key
ALTER TABLE owner_user_info
DROP PRIMARY KEY;

-- Make User_id a regular column (non-primary key)
ALTER TABLE owner_user_info
MODIFY COLUMN User_id INT NOT NULL;

-- Drop any unique constraints on User_id if they exist
ALTER TABLE owner_user_info
DROP INDEX IF EXISTS user_id;