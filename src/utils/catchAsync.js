export default (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// This utility function is used to wrap asynchronous route handlers in Express.js.

// const catchAsync = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
// export default catchAsync;