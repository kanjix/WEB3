const express = require('express');
const router = express.Router();
const { validateDbId, raiseRecord404Error, validateBlogPostData } = require('../middlewares');
const { getAllBlogs, getBlogById, createBlog: createBlog, updateBlog, deleteBlog } = require('../services/blog.service');

router.get('/', async (req, res, next) => {
    try {
        const blogs = await getAllBlogs();
        res.send(blogs);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', validateDbId, async (req, res, next) => {
    try {
        const blog = await getBlogById(req.params.id);
        if (blog) {
            res.send(blog);
        } else {
            raiseRecord404Error(req, res);
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', validateBlogPostData, async (req, res, next) => {
    try {
        const newBlog = await createBlog(req.body);
        res.status(201).json(newBlog);
    } catch (err) {
        next(err);
    }
});


router.put('/:id', validateDbId, async (req, res, next) => {
    try {
        const updatedBlog = await updateBlog(req.params.id, req.body);
        if (updatedBlog) {
            res.send(updatedBlog);
        } else {
            raiseRecord404Error(req, res);
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', validateDbId, async (req, res, next) => {
    try {
        const result = await deleteBlog(req.params.id);
        if (result.deletedCount > 0) {
            res.send({ message: 'Blog deleted successfully' });
        } else {
            raiseRecord404Error(req, res);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;