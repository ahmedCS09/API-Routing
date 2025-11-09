//Middleware to check if the client gives valid data in body or not
export const validityMiddleware = function (req, res, next) {
    const { title, price, category, desc } = req.body
    if (!title || !price || !category || !desc) {
        return res.status(400).json({
            message: 'Invalid data for creating a product',
            code: 400,
            product: null
        })
    }
    next()
}

//Middleware to check if the client gives an empty body or not
export const emptyMiddleware = function (req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            message: 'Invalid data for updating a product',
            code: 400,
            product: null
        })
    }
    next()
}