import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }
  const token = authHeader.substring(7);
  try {
    const decoded = await jwt.verify(token, secretKey);
    const currentUser = await User.findById(decoded.id);
   if (!currentUser) {
     return res.status(401).send("Unauthorized");
   }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
