const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        commentBody: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;