module.exports = (req, res, next) => {
    return res.status(404).json({ code: 400, message: "URL NOT FOUND" });
};