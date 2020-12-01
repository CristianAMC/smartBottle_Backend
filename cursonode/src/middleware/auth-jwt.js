const router = require('express').Router(); 
const jwt = require('jsonwebtoken')

router.use((req, res, next ) => {
    const token = req.headers['authorization']; 
    if(!token || token == undefined || token == null){
        return res.status(401).send({error: "Unauthorized, not token found"})
    }else if(token){
        jwt.verify(token, '1006361228', (err, decoded) => {
            if (err) {
                return res.status(401).send({error: 'Invalid token'});
            }else{
                next()
            }
        })
    }
})


export default router; 