const express = require("express");
const router = express.Router();

/**
 * @desc Home page - lists all published articles or a simple welcome message
 */
router.get("/", (req, res) => {
  // For now, just render a static home page; later, you can add logic to list articles, etc.
  res.render("index"); // Make sure you have 'index.ejs' in your views directory
});

// Author home page route
router.get("/author-home", (req, res) => {
  res.render("author-home");
});

// Author settings page route
router.get("/author-settings", (req, res) => {
  res.render("author-settings");
});

// Edit article page route
router.get("/edit-article", (req, res) => {
  res.render("edit-article");
});

// Reader home page route
router.get("/reader-home", (req, res) => {
  res.render("reader-home");
});

// Reader article page route
router.get("/reader-article", (req, res) => {
  res.render("reader-article");
});

/**
 * @desc Article page - shows a single article and its comments and reactions
 */
router.get("/article/:id", (req, res) => {
  const articleQuery = "SELECT * FROM Articles WHERE article_id = ?";
  const commentsQuery = "SELECT * FROM Comments WHERE article_id = ?";
  const reactionsQuery =
    "SELECT reaction_type, COUNT(*) as count FROM Reactions WHERE article_id = ? GROUP BY reaction_type";

  global.db.get(articleQuery, [req.params.id], (err, article) => {
    if (err) {
      res.status(500).send("Error accessing article");
    } else {
      global.db.all(commentsQuery, [req.params.id], (err, comments) => {
        if (err) {
          res.status(500).send("Error accessing comments");
        } else {
          global.db.all(reactionsQuery, [req.params.id], (err, reactions) => {
            if (err) {
              res.status(500).send("Error accessing reactions");
            } else {
              res.render("article", {
                // Assuming your article page EJS template is named 'article'
                article: article,
                comments: comments,
                reactions: reactions,
              });
            }
          });
        }
      });
    }
  });
});

// Export the router object so index.js can access it
module.exports = router;
