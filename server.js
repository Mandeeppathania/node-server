const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) =>
{
    // Serve the CSS file separately
    if (req.url === "/style.css")
    {
        const cssFile = path.join(__dirname, "public", "style.css");
        fs.readFile(cssFile, (err, data) =>
        {
            if (err)
            {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.end("Unable to load CSS file.");
                return;
            }
            res.writeHead(200, {
                "Content-Type": "text/css"
            });
            res.end(data);
        });
        return;
    }
    let page = "";
    let status = 200;
    // Select the page according to the requested URL
    switch (req.url)
    {
        case "/":
        case "/home":
            page = "home.html";
            break;
        case "/about":
            page = "about.html";
            break;
        case "/contact":
            page = "contact.html";
            break;
        case "/services":
            page = "services.html";
            break;
        default:
            page = "404.html";
            status = 404;
    }
    const pagePath = path.join(__dirname, "pages", page);
    // Read the required HTML page and send it to the browser
    fs.readFile(pagePath, (err, data) =>
    {
        if (err)
        {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });
            res.end("Internal Server Error");
            return;
        }
        res.writeHead(status, {
            "Content-Type": "text/html"
        });
        res.end(data);
    });
});
server.listen(3000, () =>
{
    console.log("Server running at http://localhost:3000");
});