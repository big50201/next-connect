const monogoose = require("mongoose");
const User = monogoose.model("User");
const passport = require("passport");

exports.validateSignup = (req,res,next) => {
    req.sanitizeBody("name");
    req.sanitizeBody("email");
    req.sanitizeBody("password");

    //名字不能為空且名字必須在4-10字元
    req.checkBody("name","Enter a name").notEmpty();
    req.checkBody("name","Name must be between 4-10 characters.").isLength({min:4,max:10});
    //email不能為空且必須符合電子郵件格式
    req.checkBody("email","Enter a name").isEmail().normalizeEmail();
    //密碼不能為空且名字必須在4-10字元
    req.checkBody("password","Enter a name").notEmpty();
    req.checkBody("password","Password must be between 4-10 characters.").isLength({min:4,max:10});

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(err=>err.msg)[0];
        return res.status(400).send(firstError);
    }
    next();
};

exports.signup = async(req,res) => {
    const {name,email,password} = req.body;
    const user = await new User({name,email,password});
    await User.register(user,password,(err,user)=>{
        if(err){
            return res.status(500).send(err.message)
        }

        res.json(user);
    });

};

exports.signin = (req,res,next) => {
    passport.authenticate("local",(err,user,info)=>{
        if(err){
            return res.status(500).json(err.message);
        }

        if(!user){
            return res.status(400).json(info.message);
        }

        req.login(user,err=>{
            if(err){
                return res.status(500).json(err.message);
            }

            res.json(user);
        })
    })(req,res,next)

};

exports.signout = () => {};

exports.checkAuth = () => {};
