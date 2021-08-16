const jwt = require("jsonwebtoken");
const User = require("../studentAPI");

const Authenticate = async (req, res, next) => {
    console.log('in middelware');
    try{

const token = await req.cookies.jwtoken;
console.log( 'REQ  TOKEN' + token);
const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
console.log( 'ERTY  VERY' + verifyToken);

const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token":token    });

if (!rootUser) { throw new Error('User not found')}

req.token = token;
req.rootUser = rootUser;
req.rootUser = rootUser._id;

next()
    } catch (err) {

        res.status(401).send('Unauthorized No tokens');
        console.log(err);
    }

}

module.exports = Authenticate;
