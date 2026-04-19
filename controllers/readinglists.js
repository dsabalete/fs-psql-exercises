const router = require('express').Router()
const { ReadingList } = require('../models')

router.get('/', async (req, res) => {
    const readingLists = await ReadingList.findAll()
    res.json(readingLists)
})

router.post('/', async (req, res, next) => {
    const { userId, blogId } = req.body

    try {
        const readingList = await ReadingList.create({ userId, blogId })
        res.json(readingList)
    } catch (error) {
        next(error)
    }
})

module.exports = router