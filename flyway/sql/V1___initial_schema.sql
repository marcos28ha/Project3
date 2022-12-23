/* Create your schema here */
CREATE TABLE account (
    nickname varchar(255) PRIMARY KEY
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_name TEXT,
    FOREIGN KEY (account_name) REFERENCES account(nickname)
);

CREATE TABLE response (
    id SERIAL,
    content TEXT NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message_id int,
    account_name TEXT,
    FOREIGN KEY (account_name) REFERENCES account(nickname),
    PRIMARY KEY(id, message_id),
    FOREIGN KEY (message_id) REFERENCES messages(id)
);