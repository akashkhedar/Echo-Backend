const { verifyAccessToken, createAccessToken } = require("../Utils/cookie");
const { validateRefreshToken } = require("../Utils/redis");
const { match } = require("path-to-regexp");
const cache = require("../Utils/cache");

const cookieAuthentication = async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  const unprotectedRoutes = [
    "/api/auth/create",
    "/api/auth/verify",
    "/api/auth/login",
    "/api/auth/forget-password",
    "/api/auth/verify-reset-token/:token",
    "/api/auth/update-password/:token",
    "/api/admin/upload/all",
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
    return res.status(401).end("Refresh Token false");
  }
  if (!accessCookie) {
    if (!verifyRefreshToken.profileStatus) {
      return res.status(401).end("Profile incomplete");
    }
    const userInfo = {
      userId: verifyRefreshToken.userId,
      username: verifyRefreshToken.username,
      fullname: verifyRefreshToken.fullname,
      profileImage: verifyRefreshToken.profileImage,
      profileStatus: verifyRefreshToken.profileStatus,
    };
    const newAccessToken = createAccessToken(userInfo);
    cache.set(newAccessToken, userInfo, 7200); // Increased to 2 hours
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7200000, // Increased to 2 hours
      domain: isProduction ? ".echo.linkpc.net" : undefined,
      path: "/",
    });

    req.user = verifyRefreshToken;
    return next();
  }
  const userInfo = cache.get(accessCookie);
  if (!userInfo) {
    return res.status(401).end("Unauthorized!");
  }
  req.user = userInfo;
  next();
};

module.exports = cookieAuthentication;
