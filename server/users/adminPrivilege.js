var admins = ['kweng2', 'alanzfu', 'puzzlehe4d', 'hahnbi'];
module.exports = function (req, res, next) {
  if (req.session.passport) {
    var isAdmin = admins.indexOf(req.session.passport.user.username) !== -1;
    if (isAdmin) {
      next();
    } else {
      res.status(401).end('<html>Requires admin privilege<br><a href="/auth/github">Log In</a></html>');
    }
  } else {
    res.status(401).end('<html>Requires admin privilege<br><a href="/auth/github">Log In</a></html>');
  }
};
