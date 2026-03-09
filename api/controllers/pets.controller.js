import Pet from "../models/pet.model.js";

export async function create(req, res) {
    const pet = await Pet.create(req.body);

    res.json(pet);
}

export async function destroy(req, res) {
    const pet = await Pet.findById(req.params.id);

    if (pet.owner.toString() !== req.session.user.id.toString()) {
        throw createHttpError(403, "It is not your pet!");
    }

    await Pet.findByIdAndDelete(pet.id);

    res.status(204).end();
}

export async function update(req, res) {
    delete req.body.email;

    Object.assign(req.session.user, req.body);

    if (req.file) {
        req.session.user.avatarUrl = req.file.path;
    }

    await req.session.user.save();
    res.json(req.session.user);
}