import Like from "../models/like.model.js";
import createHttpError from "http-errors";

export async function create(req, res) {
    const like = await Like.create(req.body);

    res.json(like);
}

export async function count(req, res) {
    const likesCount = await Like.countDocuments({
        targetId: postId,
        targetType: "Post"
    });

    res.json(likesCount);
}

export async function remove(req, res) {
    await Like.findByIdAndDelete(req.body);

    res.status(204).end();
}