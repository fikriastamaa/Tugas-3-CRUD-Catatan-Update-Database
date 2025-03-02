import Catatan from "../models/CatatanModel.js";

export const getCatatan = async (req, res) => {
    try {
        const response = await Catatan.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCatatan = async (req, res) => {
    try {
        await Catatan.create(req.body);
        res.status(201).json({ message: 'Catatan berhasil ditambahkan' });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCatatan = async (req, res) => {
    try {
        const { id } = req.params;
        await Catatan.update(req.body, {
            where: { id: id }
        });
        res.status(200).json({ message: 'Catatan berhasil diupdate' });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCatatan = async (req, res) => {
    try {
        const { id } = req.params;
        await Catatan.destroy({
            where: { id: id }
        });
        res.status(200).json({ message: 'Catatan berhasil dihapus' });
    } catch (error) {
        console.log(error.message);
    }
}