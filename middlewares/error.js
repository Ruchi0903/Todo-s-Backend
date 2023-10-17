class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
// ErrorHandler because everywhere in the errors we can't display 404, different issues should show different status codes. Therefore this handler is used.

export const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;