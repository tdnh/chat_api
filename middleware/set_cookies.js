'use strict';


module.exports = (req, res, next) => {
  try {
    if (!req.signedCookies.user) {
      console.log(req.headers)
      res.cookie(
        'user',
        1123123,
        { expires: new Date(Date.now() + 900000), signed: true, httpOnly: true }
      );
    }
    return next();
  } catch (error) {
    return next(error);
  }
}