import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        targetType: {
            type: String,
            enum: ['post', 'comment'],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
            },
        },
    },
);

likeSchema.index( { user: 1, targetId: 1, targetType: 1 }, { unique: true } );

const Like = mongoose.model('Like', likeSchema);

export default Like;