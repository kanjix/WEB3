const { ObjectId } = require('mongodb');
const { getDb } = require('../web3');

const COLLECTION_NAME = 'blogs';

async function getAllBlogs() {
    const db = await getDb();
    return db.collection(COLLECTION_NAME).find().toArray();
}

async function getBlogById(id) {
    const db = await getDb();
    return db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
}

async function createBlog(blog) {
    blog.timestamps = new Date();
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne(blog);
    return result;
}

async function updateBlog(id, blog) {
    blog.timestamps = new Date();
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: blog });
    if (result.modifiedCount > 0) {
        return blog;
    } else {
        return null;
    }
}


async function deleteblog(id) {
    const db = await getDb();
    return db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllBlogs: getAllBlogs, getBlogById: getBlogById, createBlog: createBlog, updateBlog: updateBlog, deleteBlog: deleteblog };