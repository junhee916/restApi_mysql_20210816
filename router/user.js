const { response } = require('express')
const express = require('express')
const db = require('../database')
const router = express.Router()

// get user
router.get('/', async (req, res) => {

    try{
        const result = await db.promise().query("select*from users")

        res.status(200).json({
            msg : "get users",
            userInfo : result
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// register user 
router.post('/', async (req, res) => {

    const { nickname, password } = req.body

    if(nickname && password){
        try{
            await db.promise().query(`insert into users (nickname, password) values ('${nickname}', '${password}')`)

            res.status(200).json({
                msg : "success signup"
            })
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
})

// update user
router.patch('/:userId', async (req, res) => {

    const id = req.params.userId

    const { nickname } = req.body

    const sql = "update users set nickname = ? where id = ?"

    try{    

        const result = await db.promise().query(sql, [nickname, id])

        res.status(200).json({
            msg : "update users",
            userInfo : result
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// delete user
router.delete('/', async (req, res) => {
    
    try{
        await db.promise().query("delete from users")

        res.status(200).json({
            msg : "delete users"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

module.exports = router