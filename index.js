/* 
Express
HTTP request methods
   -GET
   -POSt
Routing


Request object
  -req.params
  -req.body


*/



const express = require('express');
const app = express();
const posts = require('./posts.json')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded())



app.get('/posts', (req, res) => {
    // fetch all users
    // send the user array as response to the client
   return res.json({posts})
})

//////////////////////////
//create new post
app.post('/posts', (req, res) => {
    console.log(req.body)
    // create a new user from client's request
    // save new user to existing database
    posts.push(req.body)
    // save updated data to users json
    // stringify the json data
    let stringedData = JSON.stringify(posts, null, 2)
    // rewrite the file posts.json
    fs.writeFile('posts.json', stringedData, (err) => {
        if(err){
            res.status(500).json({message: err})
        }
    })
    
    // send back a response to client
   return res.status(200).json({message: "new post created"})

})


//////////////////////////////
//fetch single post
app.get('/posts/:id', (req, res) => {
    //fetch req.params.id
    let id = req.params.id
    //find post with id
   let foundPost = posts.find((posts) => {
        return String(posts.id) === id

    })
    if(foundPost){
        return res.status(200).json({posts: foundPost})
    }else {
        return res.status(404).json({message: "post not found"})
    }
    //return post object as response
    //return a 404 error post is not found
    
})


///////////////////////////////
//update single post
app.put('/posts/:id', (req, res) => {
    let postId = req.params.id
    let foundPost = posts.find(post => {
        return String(posts.id) === postId
    })

    let index = posts.indexOf(foundPost)
    posts[index] =  {
        userId: foundPost.userId,
        id: foundPost.id,
        title: req.body.title,
        body: req.body.body
    }

    let stringPosts = JSON.stringify(posts, null)
    fs.writeFile('posts.json', stringPosts, (err) => {
        if(err) {
            return res.json({err})
        }

        return res.status(200).json({message: "post updated"})
    })
  
  
})



app.listen(3000, () => {
    console.log("server is up and running")
})
