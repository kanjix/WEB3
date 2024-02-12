const ObjectId = require('mongoose').Types.ObjectId

const validateDbId = (req, res, next) => {
    if (ObjectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: `given object id(${req.params.id}) is not valid. `
        })
    else
        next()
}
const validateBlogPostData = (req, res, next) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required' });
    }
    next();
};

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error:'no record with given _id :' + req.params.id
    })
}
const errorHandler = (error, req, res, next) => {
    console.error(error); 
    res.status(500).json({ error: error.message }); 
};

module.exports = {
    validateDbId,
    raiseRecord404Error,
    errorHandler,
    validateBlogPostData
};