import jwt from 'jsonwebtoken';
export const verifyUser = async (req, res, next) => {
    try {
        // console.log(req.cookies)
        const token = req.cookies.token;
        // console.log(token)
        if(!token){
            return res.status(401).json({
                message:'Internal Server error'
            })
        }
        jwt.verify(token , process.env.JWT_KEY, async(err , payload) => {
            if(err){
                return res.status(401).json({
                    message:'Invalid token',
                    error:err.message
                })
            }
            req.id = payload.id;
        });
        next();


    } catch (error) {
        console.log(error)
    }
}