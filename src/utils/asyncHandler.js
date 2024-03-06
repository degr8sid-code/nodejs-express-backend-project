// since we use async in a lot of places, we create its util ( a wrapper function ) and use it when we want
// we can create try/catch too
// this one is with promises
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }