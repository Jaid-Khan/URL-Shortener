// Import Express framework
const express = require("express");

// Create Express application
const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from "public" folder
app.use(express.static("public"));

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies
app.use(express.json());

// Object to store shortCode → original URL mapping
let url = {};

// Generate a random short code
function generateShortCode() {
  let id = "id_";                         // Prefix for ID
  let num = Math.floor(Math.random() * 10000); // Random number
  let shortCode = id + num;               // Combine prefix + number
  return shortCode;                       // Return short code
}

// Render home page
app.get("/", (req, res) => {
  res.render("index");                    // Load index.ejs
});

// Create short URL
app.post("/shortener", (req, res) => {
  let shortCode = generateShortCode();    // Generate short ID
  url[shortCode] = req.body.url;          // Store original URL
  console.log(url);                       // Debug stored URLs
  res.render("shortener", {               // Show shortened URL
    shortUrl: `http://localhost:3000/${shortCode}`
  });
});

// Middleware to handle short URL redirection
function middleware(req, res, next) {
  let newUrl = req.originalUrl;           // Get request path
  newUrl = newUrl.slice(1);               // Remove "/" from path
  console.log(newUrl);                    // Debug short code
  res.redirect(url[newUrl]);              // Redirect to original URL
}

// Apply middleware to unmatched routes
app.use(middleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

