const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.auth_jwt;
    // console.log(token);
    if(token){
        jwt.verify(token, 'h8BHWDXuW1IPcUHNcCNdsDKucaqHgLzN6ZZT4DMm0LM', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
    
}

module.exports = { requireAuth }