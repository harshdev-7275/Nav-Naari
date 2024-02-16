import jwt,{decode} from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.userId).select('-password');
        // console.log('authenticated');
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
}