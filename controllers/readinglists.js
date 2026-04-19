const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
    const readingLists = await ReadingList.findAll()
    res.json(readingLists)
})

router.post('/', async (req, res, next) => {
    const { userId, blogId } = req.body

    if (!userId || !blogId) {
        return res.status(400).json({ error: 'userId and blogId are required' })
    }

    const [user, blog] = await Promise.all([
        User.findByPk(userId),
        Blog.findByPk(blogId)
    ])

    if (!user || !blog) {
        return res.status(404).json({ error: 'Blog or User not found' })
    }

    const existingReadingListEntry = await ReadingList.findOne({
        where: { userId, blogId }
    })

    if (existingReadingListEntry) {
        return res.status(400).json({ error: 'Blog already in reading list' })
    }

    try {
        const readingList = await ReadingList.create({ userId, blogId })
        return res.status(201).json(readingList)
    } catch (error) {
        return next(error)
    }
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const readingList = await ReadingList.findByPk(req.params.id)
    if (!readingList) {
        return res.status(404).end()
    }
    if (readingList.userId !== req.decodedToken.id) {
        return res.status(401).json({ error: 'not authorized' })
    }
    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
})

module.exports = router