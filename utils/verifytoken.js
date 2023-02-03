import jwt from "jsonwebtoken";


const verifytoken = token => {
    return jwt.verify(token,"ndxt34f51", (error, decoded) => {
        if(error){
            return false;
        }
        else{
            return decoded;
        }
    })
}
export default verifytoken;