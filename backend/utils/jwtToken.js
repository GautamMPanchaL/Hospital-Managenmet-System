export const genrateToken = (user, message, statusCode, res)=>{
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patinetToken";

    res.status(statusCode).cookie(cookieName, token, {
        expire: new Date(Date.now()) + process.env.COOKIE_EXPIRE*24*60*1000,
        httpOnly: true
    }).json({
        success: true,
        message,
        user,
        token,
    });
}