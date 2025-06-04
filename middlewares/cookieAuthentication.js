const userProfile = require("../controllers/userProfile");
const { verifyAccessToken, createAccessToken } = require("../Utils/cookie");
const { validateRefreshToken } = require("../Utils/redis");
const { match } = require("path-to-regexp");
const cache = require("../Utils/cache");

const cookieAuthentication = async (req, res, next) => {
  const unprotectedRoutes = [
    "/user/create",
    "/user/verify",
    "/user/login",
    "/forget-password",
    "/auth/verify-reset-token/:token",
    "/update-password/:token",
    "/forgetpassword/update/:code",
  ];
  const isUnprotectedRoute = (path) => {
    return unprotectedRoutes.some((route) => match(route)(path));
  };

  if (isUnprotectedRoute(req.path)) {
    return next();
  }
  const accessCookie = req.cookies?.accessToken;
  const refreshCookie = req.cookies?.refreshToken;
  if (!refreshCookie) {
    return res.status(401).end("Login Again");
  }
  req.user = null;
  const verifyRefreshToken = await validateRefreshToken(refreshCookie);
  if (!verifyRefreshToken) {
    return res.status(401).end("Login Again");
  }
  if (!accessCookie) {
    const userInfo = {
      userId: verifyRefreshToken.userId,
      username: verifyRefreshToken.username,
      fullname: verifyRefreshToken.fullname,
      profileImage: verifyRefreshToken.profileImage,
    };
    const newAccessToken = createAccessToken(userInfo);
    cache.set(newAccessToken, userInfo, 3600);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });
    req.user = verifyRefreshToken;
    return next();
  }
  const userInfo = cache.get(accessCookie);
  if (!userInfo) {
    const user = verifyAccessToken(accessCookie);
    if (!user) {
      return res.status(401).end("Login Again");
    }
    req.user = user;
    return next();
  }
  req.user = userInfo;
  next();
};

module.exports = cookieAuthentication;
