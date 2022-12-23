const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')

exports.signup = async(req, res, next) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            throw new Error("Please provide all feilds")
        }

        const user = await prisma.user.create({
            data:{
                name, email, password
            }
        })

        cookieToken(user,res)
    } catch (error) {
        throw new Error(error)
    }
}

exports.login =async(req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            throw new Error("Please provide email and password")
        }
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            throw new Error('User not found')
        }

        if(user.password !== password){
            throw new Error('password is incorrect')
        }
        
        cookieToken(user,res)
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async(req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}