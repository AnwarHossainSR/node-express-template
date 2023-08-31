import HttpException from '@/utils/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    const status = error.status || 500;
    let message = error.message || 'Something went wrong';

    // Wrong Mongodb Id error
    if (error.name === 'CastError') {
        const match = /path "([^"]+)"/.exec(error.message);
        const invalidPath = match ? match[1] : 'unknown field';
        message = `Resource not found. Invalid: ${invalidPath}`;
    }

    // Mongoose duplicate key error (generic approach)
    if (error.name === 'MongoError') {
        const duplicateMessage =
            /E11000 duplicate key error collection: .* index: (.+)/.exec(
                error.message
            );
        if (duplicateMessage) {
            const fieldName = duplicateMessage[1];
            message = `Duplicate ${fieldName} Entered`;
        }
    }

    // Wrong JWT error
    if (error.name === 'JsonWebTokenError') {
        message = `Json Web Token is invalid, Try again `;
    }

    // JWT EXPIRE error
    if (error.name === 'TokenExpiredError') {
        message = `Json Web Token is Expired, Try again `;
    }

    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
