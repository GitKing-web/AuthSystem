const { model, Schema } = require('mongoose');

const PostSchema = new Schema(
    {
        userId: { type: String, required: true },
        posts: [
            {
                postId: { type: String },
                title: { type: String, required: true},
                postDesc: { type: String, required: true}
            }
        ]
    }

);

const Posts = model('Posts', PostSchema)

module.exports = Posts;