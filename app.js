const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

// ========== Import / require posts from data.js ========== //
let posts = require("./data");
const {request, response} = require("express");
console.log(posts);

// ========== REST API Implementation ========== //

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ========== READ: read all posts from posts ========== //
app.get("/posts", (req, res) => {
return res.json(posts);
});

// ========== READ: get post by id ========== //
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const getPostById = posts.find(item => item.id == id);
    return res.json(getPostById);
});

// ========== CREATE: create new post and add to posts ========== //
app.post("/posts", (request, response)=> {
    let newPost = request.body;
    newPost.id = Date().now();
    posts.push(newPost);
    return response.json(newPost);

});


// ========== UPDATE: update existing post ========== //
// Todo

// ========== DELETE: delete post ========== //
app.delete("/posts/:id",(request, response) => {
        const id = request.params.id;
        posts =  posts.filter(post => post.id != id);
        return response.json(posts);
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});
