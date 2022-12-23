const prisma = require('../prisma/index')

exports.createPost = async(req, res, next) =>{
    try {
       const {slug, title, body, authorId} = req.body
       if(!slug || !title || !body || !authorId){
            throw new Error("Please send all fields (slug, title, body, authorId)")
       }
       const result = await prisma.post.create({
        data:{
            slug,title, body, author : {connect: {id: authorId}}
        }
       })
       res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

exports.updatePost = async(req, res, next) =>{
    const {id} = req.params
    const {title, body} = req.body
    try {
        const result = prisma.post.update({
            where:{
                id: id
            },
            data:{
                title,body
            }
        })
        res.json(result)
    } catch (error) {
        req.json({error: `Post with ${id} does not exist`})
    }
}

exports.deletePost = async(req, res, next) => {
    const {id} = req.params
    try {
        const result = await prisma.post.delete({
            where:{
                id: id
            }
        })
        res.json(result)
    } catch (error) {
        res.json({error: `Post with ${id} does not exist`})
    }
}

exports.getPost = async(req, res, next) =>{
    try {
        const result = await prisma.post.findMany()
        res.json(result)
    } catch (error) {
        res.json({error: `No Post was found`})
    }
}