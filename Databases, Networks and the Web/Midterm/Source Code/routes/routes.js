const express = require("express");
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.render("index");
});

// Author home page route
router.get("/author-home", (req, res) => {
  const draftQuery =
    "SELECT * FROM Articles WHERE published_at IS NULL ORDER BY created_at DESC";
  const publishedQuery =
    "SELECT * FROM Articles WHERE published_at IS NOT NULL ORDER BY published_at DESC";

  global.db.all(draftQuery, (err, drafts) => {
    if (err) {
      return res
        .status(500)
        .send("Error fetching draft articles: " + err.message);
    }
    // Convert string dates to Date objects
    drafts = drafts.map((draft) => ({
      ...draft,
      created_at: new Date(draft.created_at),
      last_modified_at: new Date(draft.last_modified_at),
    }));

    global.db.all(publishedQuery, (err, published) => {
      if (err) {
        return res
          .status(500)
          .send("Error fetching published articles: " + err.message);
      }

      published = published.map((article) => ({
        ...article,
        published_at: new Date(article.published_at),
        last_modified_at: new Date(article.last_modified_at),
      }));

      res.render("author-home", {
        drafts: drafts,
        published: published,
      });
    });
  });
});

// Author settings page route
router.get("/author-settings", (req, res) => {

  const query = "SELECT * FROM BlogSettings ORDER BY setting_id DESC LIMIT 1";

  global.db.get(query, (err, settings) => {
    if (err) {
      res.status(500).send("Failed to retrieve settings: " + err.message);
    } else {
      res.render("author-settings", { settings: settings });
    }
  });
});

router.post("/update-settings", (req, res) => {
  const { blogTitle, blogSubtitle, authorName } = req.body;

  const updateQuery =
    "UPDATE BlogSettings SET blog_title = ?, blog_subtitle = ?, author_name = ? WHERE setting_id = (SELECT setting_id FROM BlogSettings ORDER BY setting_id ASC LIMIT 1)";

  global.db.run(
    updateQuery,
    [blogTitle, blogSubtitle, authorName],
    function (err) {
      if (err) {
        res.status(500).send("Failed to update settings: " + err.message);
      } else {
        res.redirect("/author-settings");
      }
    }
  );
});

router.get("/edit-article", (req, res) => {
  res.render("edit-article", { article: null });
});

// Edit article page route
router.get("/edit-article/:id", (req, res) => {
  const query = "SELECT * FROM Articles WHERE article_id = ?";
  global.db.get(query, [req.params.id], (err, article) => {
    if (err) {
      res.status(500).send("Error fetching article: " + err.message);
    } else {
      res.render("edit-article", { article: article });
    }
  });
});

// Reader home page route
router.get("/reader-home", (req, res) => {
  const query =
    "SELECT * FROM Articles WHERE published_at IS NOT NULL ORDER BY published_at DESC";
  global.db.all(query, (err, articles) => {
    if (err) {
      console.error("Failed to fetch articles:", err);
      res.status(500).send("Error fetching articles");
    } else {
      // Convert date strings to Date objects
      const articlesWithDates = articles.map((article) => ({
        ...article,
        published_at: new Date(article.published_at), 
      }));
      res.render("reader-home", { articles: articlesWithDates });
    }
  });
});

// Reader article page route
router.get("/reader-article/:id", (req, res) => {
  const articleId = req.params.id;
  const articleQuery = "SELECT * FROM Articles WHERE article_id = ?";
  const likesQuery = "SELECT COUNT(*) AS count FROM Likes WHERE article_id = ?";
  const commentsQuery = "SELECT * FROM Comments WHERE article_id = ?";

  global.db.get(articleQuery, [articleId], (err, article) => {
    if (err) {
      res.status(500).send("Error fetching article: " + err.message);
      return;
    }
    global.db.get(likesQuery, [articleId], (err, likes) => {
      if (err) {
        res.status(500).send("Error fetching likes: " + err.message);
        return;
      }
      const likesCount = likes ? likes.count : 0;
      global.db.all(commentsQuery, [articleId], (err, comments) => {
        if (err) {
          res.status(500).send("Error fetching comments: " + err.message);
          return;
        }
        res.render("reader-article", {
          article: article,
          likesCount: likesCount,
          comments: comments,
        });
      });
    });
  });
});

router.post("/like-article", (req, res) => {
  const articleId = req.body.articleId;
  const insertLikeQuery = "INSERT INTO Likes (article_id) VALUES (?)";

  global.db.run(insertLikeQuery, [articleId], function (err) {
    if (err) {
      console.error("Error liking the article:", err);
      res.redirect(`/reader-article/${articleId}?error=Unable to like article`);
    } else {
      res.redirect(`/reader-article/${articleId}`);
    }
  });
});

router.post("/post-comment", (req, res) => {
  const { articleId, commenterName, commentText } = req.body;
  const insertCommentQuery =
    "INSERT INTO Comments (article_id, commenter_name, comment_text) VALUES (?, ?, ?)";

  global.db.run(
    insertCommentQuery,
    [articleId, commenterName, commentText],
    function (err) {
      if (err) {
        console.error("Error posting comment:", err);

        res.redirect(
          `/reader-article/${articleId}?error=Unable to post comment`
        );
      } else {
        res.redirect(`/reader-article/${articleId}`);
      }
    }
  );
});


router.post("/save-article", (req, res) => {
  const { articleTitle, articleSubtitle, articleText } = req.body;
  const isNewArticle = !req.body.articleId;

  if (isNewArticle) {
    // Insert new article into the database
    const insertQuery =
      "INSERT INTO Articles (title, subtitle, body, created_at, last_modified_at, published_at) VALUES (?, ?, ?, datetime('now'), datetime('now'), NULL)";
    global.db.run(
      insertQuery,
      [articleTitle, articleSubtitle, articleText],
      function (err) {
        if (err) {
          res.status(500).send("Failed to save article: " + err.message);
        } else {
          res.redirect("/author-home"); // Redirect back to the author home page after insertion
        }
      }
    );
  } else {
    // Update existing article in the database
    const articleId = req.body.articleId;
    const updateQuery =
      "UPDATE Articles SET title = ?, subtitle = ?, body = ?, last_modified_at = datetime('now') WHERE article_id = ?";
    global.db.run(
      updateQuery,
      [articleTitle, articleSubtitle, articleText, articleId],
      function (err) {
        if (err) {
          res.status(500).send("Failed to update article: " + err.message);
        } else {
          res.redirect("/author-home"); // Redirect back to the author home page after update
        }
      }
    );
  }
});

router.post("/publish-article", (req, res) => {
  const articleId = req.body.articleId;
  const publishQuery =
    "UPDATE Articles SET published_at = datetime('now') WHERE article_id = ? AND published_at IS NULL";

  global.db.run(publishQuery, [articleId], function (err) {
    if (err) {
      res.redirect("/author-home?status=fail");
    } else {
      if (this.changes > 0) {
        res.redirect("/author-home?status=success");
      } else {
        res.redirect("/author-home?status=alreadyPublished");
      }
    }
  });
});

router.post("/delete-article", (req, res) => {
  const articleId = req.body.articleId;
  const deleteQuery = "DELETE FROM Articles WHERE article_id = ?";

  global.db.run(deleteQuery, [articleId], function (err) {
    if (err) {
      res.redirect("/author-home?status=fail");
    } else {
      if (this.changes > 0) {
        res.redirect("/author-home?status=deleted");
      } else {
        res.redirect("/author-home?status=notFound");
      }
    }
  });
});

// Export the router object so index.js can access it
module.exports = router;
