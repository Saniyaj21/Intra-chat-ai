-- Create the chatbots table
CREATE TABLE chatbots (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL, -- Clerk's user ID
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create the chatbot_characteristics table
CREATE TABLE chatbot_characteristics (
    id SERIAL PRIMARY KEY,
    chatbot_id INT REFERENCES chatbots(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create the guests table
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create the chat_sessions table
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    chatbot_id INT REFERENCES chatbots(id) ON DELETE CASCADE,
    guest_id INT REFERENCES guests(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create the messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_session_id INT REFERENCES chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sender VARCHAR(50) NOT NULL -- 'user' or 'ai'
);

