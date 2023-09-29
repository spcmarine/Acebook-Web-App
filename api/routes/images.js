const express = require("express");
const router = express.Router();
const multer = require("multer");
const handleUpload = require("../../helper");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("sample_file");


function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
        });
    });
}  

const handler = async (req, res) => {
    try {
        await runMiddleware(req, res, myUploadMiddleware);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        res.send({
        message: error.message,
        });
    }
};

const config = {
    api: {
        bodyParser: false,
    },
};


router.post("/", handler);


module.exports = router;
