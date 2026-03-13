import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import createHttpError from "http-errors";

export async function toggle(req, res) {
    const { targetId } = req.params;

    const user = await User.findById(targetId);

    if (user) {
        throw createHttpError(400, 'Invalid post or comment id');
    }

    const like = await Like.findOne({ 
        user: req.session.user.id,
        targetId: req.params.targetId,
    });

    if (!like) {
        const newLike = await Like.create({
            user: req.session.user.id,
            targetId: req.params.targetId,
        });
        res.status(201).json(newLike);
    } else {
        await Like.findByIdAndDelete(like.id);
        res.status(204).end();
    }
}

export async function getLike(req, res) {
    const { targetId } = req.params;

    const user = await User.findById(targetId);

    if (user) {
        throw createHttpError(400, 'Invalid post or comment id');
    }

    const userId = req.session.user.id;

    const like = await Like.findOne({ user: userId, targetId });

    res.json({ liked: !!like });
}

export async function count(req, res) {
    const { targetId } = req.params;

    const user = await User.findById(targetId);
    
    if (user) {
        throw createHttpError(400, 'Invalid post or comment id');
    }

    const likesCount = await Like.countDocuments({ targetId });

    res.json(likesCount);
}