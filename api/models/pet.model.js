import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            enum: ['cat', 'dog'],
            required: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        profilePicture: {
            type: String,
            default: function () {
                return `https://i.pravatar.cc/300?u=${encodeURIComponent(this.email)}`;
            },
        },
        weight: {
            type: Number,
        },
        birthday: {
            type: Date,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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

const Pet = mongoose.model('Pet', petSchema);

export default Pet;