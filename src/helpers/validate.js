/** Import custom packages/modules */

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req, { allowUnknown: true });

    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/body.|headers.|query./, ""))
        .join("");
      return res.status(409).json({
        status: "error",
        message: message,
      });
    } else {
      return next();
    }
  };
};
