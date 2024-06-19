PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create the Articles table
CREATE TABLE IF NOT EXISTS Articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    comment_text TEXT NOT NULL,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    commenter_name TEXT,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE
);

-- Create the Reactions table
CREATE TABLE IF NOT EXISTS Likes (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE
);

-- Create the BlogSettings table
CREATE TABLE IF NOT EXISTS BlogSettings (
    setting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT,
    author_name TEXT NOT NULL
);

-- Insert default blog settings
INSERT INTO BlogSettings (blog_title, blog_subtitle, author_name) VALUES ('Adventures In Code', 'Explorations in Programming', 'Sankarshan Ghosh    ');

COMMIT;
