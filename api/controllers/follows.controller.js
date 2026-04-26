import Follow from '../models/follow.model.js';
import User from '../models/user.model.js';
import createHttpError from "http-errors";

export async function toggle(req, res) {
    if (req.params.id === req.session.user.id) {
        throw createHttpError(400, 'you can not follow yourself')
    }

    const user = await User.findById(req.params.id);
    
    if(!user) {
        throw createHttpError(404, 'Recourse not found');
    }
    
    const follow = await Follow.findOne({ 
        follower: req.session.user.id,
        following: req.params.id,
    });

    if (!follow) {
        const newFollow = await Follow.create({
            follower: req.session.user.id,
            following: req.params.id,
        });
        
        const io = req.app.get("io");

        io.to(req.session.user.id).emit("follow:created", {follower: newFollow.follower, following: newFollow.following});
        io.to(req.params.id).emit("follower:created", {follower: newFollow.follower, following: newFollow.following});

        res.status(201).json(newFollow);
    } else {
        await Follow.findByIdAndDelete(follow.id);

        const io = req.app.get("io");

        io.to(req.session.user.id).emit("follow:deleted", {follower: req.session.user.id, following: req.params.id});
        io.to(req.params.id).emit("follower:deleted", {follower: req.session.user.id, following: req.params.id});

        res.status(204).end();
    }
}