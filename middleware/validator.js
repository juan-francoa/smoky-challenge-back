const validator = (schema) => [
  (req, res, next) => {
    const data = schema.validate(req.body, { abortEarly: false });
    if (data.error) {
      return res.json({
        success: false,
        message: data.error.details.map((err) => err.message),
      });
    }
    next();
  },
];

module.exports = validator;
