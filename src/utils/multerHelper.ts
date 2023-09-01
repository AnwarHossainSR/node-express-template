import { NextFunction, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';

// Define custom types for Request, Response, and NextFunction
type CustomRequest = Request & { file: Express.Multer.File };
type CustomResponse = Response;
type CustomNextFunction = NextFunction;

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    },
});

const upload = multer({ storage: storage });

export { CustomNextFunction, CustomRequest, CustomResponse, upload };
