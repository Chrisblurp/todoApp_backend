
import verifytoken  from "../utils/verifytoken.js";
import { obtainTokenFromHeader } from "../utils/obtaintokenfromheader.js";
obtainTokenFromHeader
export const  loginChecker = (req, res, next) => {
    
    // get token from header
    const token = obtainTokenFromHeader(req);
    
    const userDecoded = verifytoken(token);

    req.userAuth = userDecoded.id;

    if(!userDecoded){
        return res.json({
            status: "failed",
            message: "Kindly, login in because, it seems the token is either expired or invalid"
        })
    }else{
        next();
    }
}