// craco.config.js
module.exports = {
  babel: {
    plugins: [
      ...(process.env.NODE_ENV === "production" ? ["transform-remove-console"] : [])
    ]
  }
};