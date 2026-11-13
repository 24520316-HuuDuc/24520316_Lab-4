const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// 1. CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5179",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// 2. Parse JSON request body
app.use(express.json({ limit: "10kb" }));

// 3. Sample forum messages
const forumMessages = {
  general: [
    {
      id: 1,
      author: "Huu Duc",
      content: "Hello everyone! Welcome to the forum.",
      createdAt: "2026-11-13T08:00:00Z",
    },
    {
      id: 2,
      author: "Minh Anh",
      content: "Nice to meet you all!",
      createdAt: "2026-11-13T08:05:00Z",
    },
  ],

  react: [
    {
      id: 3,
      author: "Huu Duc",
      content: "I am learning React Hooks.",
      createdAt: "2026-11-13T09:00:00Z",
    },
    {
      id: 4,
      author: "Thanh",
      content: "Custom Hooks help us reuse logic.",
      createdAt: "2026-11-13T09:10:00Z",
    },
  ],

  node: [
    {
      id: 5,
      author: "Huu Duc",
      content: "Express makes building APIs easier.",
      createdAt: "2026-11-13T10:00:00Z",
    },
  ],
};

// 4. GET messages by channel
app.get("/api/channels/:channelId/messages", (req, res) => {
  const { channelId } = req.params;

  if (!Object.prototype.hasOwnProperty.call(forumMessages, channelId)) {
    return res.status(404).json({
      error: "Channel not found",
    });
  }

  return res.json(forumMessages[channelId]);
});

// 5. POST a new message with strict payload validation
app.post("/api/channels/:channelId/messages", (req, res) => {
  const { channelId } = req.params;
  const body = req.body;

  if (!Object.prototype.hasOwnProperty.call(forumMessages, channelId)) {
    return res.status(404).json({
      error: "Channel not found",
    });
  }

  // Only allow author and content
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length !== 2 ||
    !Object.prototype.hasOwnProperty.call(body, "author") ||
    !Object.prototype.hasOwnProperty.call(body, "content")
  ) {
    return res.status(400).json({
      error: "Invalid payload. Only author and content are allowed.",
    });
  }

  const { author, content } = body;

  if (
    typeof author !== "string" ||
    typeof content !== "string" ||
    author.trim().length < 2 ||
    author.trim().length > 50 ||
    content.trim().length < 1 ||
    content.trim().length > 500
  ) {
    return res.status(400).json({
      error: "Author must be 2-50 characters and content 1-500 characters.",
    });
  }

  const newMessage = {
    id: Date.now(),
    author: author.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };

  forumMessages[channelId].push(newMessage);

  return res.status(201).json(newMessage);
});

// 6. Handle invalid JSON or unexpected errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON payload",
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "Internal server error",
  });
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
});