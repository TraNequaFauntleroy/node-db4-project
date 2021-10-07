const router = require('express').Router()
const Recipe = require('./recipes-model')

router.get('/recipe:id', (req, res, next) => {
    Recipe.getRecipeById(req.params.id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

router.use('*', (req, res) => {
    res.json({ api: 'up' })
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the recipes router',
        message: err.message
    })
})

module.exports = router