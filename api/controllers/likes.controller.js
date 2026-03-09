import Like from "../models/like.model.js";
import createHttpError from "http-errors";

export async function toggle(req, res) {
    const like = await Like.findOne({ 
        user: req.session.user.id,
        targetId: req.body.targetId,
        targetType: req.body.targetType,
    });

    if (!like) {
        const newLike = await Like.create({
            user: req.session.user.id,
            targetId: req.body.targetId,
            targetType: req.body.targetType,
        });
        res.json(newLike);
    } else {
        await Like.findByIdAndDelete(like.id);
        res.status(204).end();
    }
}

export async function getLike(req, res) {
    const { targetId, targetType } = req.query;
    const userId = req.session.user.id;

    const like = await Like.findOne({ user: userId, targetId, targetType });

    res.json({ liked: !!like });
}

export async function count(req, res) {
    
    const { targetId, targetType } = req.query;

    if (!targetId || !targetType) {
        throw createHttpError(400, "missing targetId or targetType");
    }

    const likesCount = await Like.countDocuments({
        targetId,
        targetType,
    });

    res.json(likesCount);
}