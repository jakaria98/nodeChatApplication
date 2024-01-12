const multer = require('multer');
const path = require('path');
const createError = require('http-errors');


const uploader = (subfolderPath, allowedFileTypes, maxFileSize, errorMessage) => {
    const uploadsFolder = `${__dirname}/../public/uploads/${subfolderPath}`;
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadsFolder);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') + '-' + Date.now();
            cb(null, fileName + fileExt);
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (allowedFileTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        },
        limits: {
            fileSize: maxFileSize
        }
    });
    return upload;
}

module.exports = uploader;
