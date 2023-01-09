const {
  creatorResponse,
  fileNotFoundResponse,
} = require("../config/responses");

const verifyUser = (model) => [
  async (req, res, next) => {
    let activity = await model.findOne({ _id: req.params.id });
    if (activity) {
      if (Array.isArray(activity.userId)) {
        let response = activity.userId.find((user) => user.equals(req.user.id));
        if (response) {
          return next();
        } else {
          return creatorResponse(req, res);
        }
      } else {
        if (activity.userId.equals(req.user.id)) {
          return next();
        } else {
          return creatorResponse(req, res);
        }
      }
    }
    return fileNotFoundResponse(req, res);
  },
];

module.exports = verifyUser;
