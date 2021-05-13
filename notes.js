
        console.log(req.body)
        let pmId = req.params.id


        posts.find((posts) => {
        if(posts.id === pmId){
           let updateUp = posts.splice(1, 2, req.body.title, req.body.body)
            let stringData = JSON.stringify(updateUp)
    
            fs.writeFile('posts.json', stringData, (err) => {
              if(err){
            res.status(500).json({message: err})
            }

        })
       
    

        }
    
    })

    return res.status(200).json({message: "post updated"})
