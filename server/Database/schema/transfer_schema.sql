-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id VARCHAR(255) PRIMARY KEY,
    preferred_club_id INT,
    balance DECIMAL(15,2) DEFAULT 1000000,
    FOREIGN KEY (preferred_club_id) REFERENCES Club(club_id)
);

-- Transfer history table
CREATE TABLE IF NOT EXISTS transfer_history (
    transfer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255),
    item_id INT,
    item_type ENUM('player', 'manager', 'club'),
    amount DECIMAL(15,2),
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('completed', 'pending', 'failed') DEFAULT 'completed'
);

-- User owned items table
CREATE TABLE IF NOT EXISTS user_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255),
    item_id INT,
    item_type ENUM('player', 'manager', 'club'),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_item (user_id, item_id, item_type)
);
