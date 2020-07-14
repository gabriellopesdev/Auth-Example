import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

class Auth {

    GetToken(value: Number) {
               
        const token = jwt.sign( { id: value }, String(process.env.SECRET), {
            expiresIn: 60
        })
        return token
    }    

    ValidateToken(req: Request, res: Response, next: NextFunction){

        const token = req.headers['x-access-token'];
        
        if (!token) { 
            return res.status(401).json({ auth: false, message: 'No token provided.' })
        }

        const decodedToken : any  = jwt.verify(String(token), String(process.env.SECRET), 
            function(error, decoded) {
                return (decoded)
            })   

        console.log(decodedToken.id)

        if (!decodedToken) { 
            return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' })
        }
        
        req.body.Id =  decodedToken.id;

        next();    

    }

}

export default Auth