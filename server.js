// Import required modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Create the HTTP server
const server = http.createServer((req, res) =>
{
    // Handle CSS file request
    if (req.url === "/style.css")
    {
        // Create the path for style.css
        const cssPath = path.join(__dirname, "public", "style.css");
        // Read the CSS file
        fs.readFile(cssPath, (err, data) =>
        {
            if (err)
            {
                // Send error if CSS file is not found
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.end("CSS File Not Found");
                return;
            }
            // Send CSS file to the browser
            res.writeHead(200, {
                "Content-Type": "text/css"
            });

            res.end(data);
        });
        // Stop further execution after sending CSS
        return;
    }
    // Variables to store the page name and status code
    let fileName;
    let statusCode;
    // Route for Home page
    if (req.url === "/" || req.url === "/home")
    {
        fileName = "home.html";
        statusCode = 200;
    }
    // Route for About page
    else if (req.url === "/about")
    {
        fileName = "about.html";
        statusCode = 200;
    }
    // Route for Contact page
    else if (req.url === "/contact")
    {
        fileName = "contact.html";
        statusCode = 200;
    }
    // Additional Services page
    else if (req.url === "/services")
    {
        fileName = "services.html";
        statusCode = 200;
    }
    // If no route matches, show 404 page
    else
    {
        fileName = "404.html";
        statusCode = 404;
    }
    // Create complete path of the requested HTML file
    const filePath = path.join(__dirname, "pages", fileName);
    // Read the HTML file asynchronously
    fs.readFile(filePath, (err, data) =>
    {
        // Handle file reading errors
        if (err)
        {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });
            res.end("500 - Internal Server Error");
            return;
        }
        // Send the HTML page with the correct status code
        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });
        res.end(data);
    });
});

// Start the server on port 3000
server.listen(3000, () =>
{
    console.log("Server is running on http://localhost:3000");
});