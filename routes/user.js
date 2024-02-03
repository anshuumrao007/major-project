const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");//neeche jaise hi tum wrapasync likhoge apne aa yeh line aa jayegi
const passport = require("passport");
const{saveRedirectUrl} = require("../middleware.js");


const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapasync(userController.signup))

router.route("/login")
.get( userController.renderLoginForm)
.post(
  saveRedirectUrl,// yha pe hm authrnticate krne se phle hi save krva rhe hai to kyuki paaasport sesion ko empty kr deta hai authnticate krte time
 passport.authenticate("local",{
  failureRedirect: "/login", 
  failureFlash: true,
 }),
  userController.login
 );



//1
//signup
// router.get("/signup", (req, res)=>{
// res.render("users/signup.ejs");
// });

//signup
// router.get("/signup", userController.renderSignupForm);


//2
//accepting signup details
// router.post(
//   "/signup",
// wrapasync(async (req, res)=>{
//     try{
//         let { username, email, password} = req.body;
//         const newUser = new User({email, username});
//      const registeredUser=  await  User.register(newUser, password);
//      console.log(registeredUser);
//      //ab jaise hi signup krege to login nhi krna pdega seedhe login bhi ho jsyyega using paasport locals
//      req.login(registeredUser, (err)=>{
//       if(err){
//         return next(err);
//       }
//       req.flash("success", "Welcome to Wanderlust!");
//       res.redirect("/listings");
//      })
//     }
//   catch(e){//try catch likhne se ab agr user phle se exist krta hua to ab ek upr message flash hoga ar page usi me rhega 
//     req.flash("error", e.message);
//     res.redirect("/signup");
//   }
// }));

// accepting signup details
// router.post(
//   "/signup",
// wrapasync(userController.signup));

//3
//login page
// router.get("/login", (req, res)=>{
//     res.render("users/login.ejs");
// })

//login page
// router.get("/login", userController.renderLoginForm);


//4
////middleware to authenticate user h ya nhi
// router.post(
//   "/login",
//   saveRedirectUrl,// yha pe hm authrnticate krne se phle hi save krva rhe hai to kyuki paaasport sesion ko empty kr deta hai authnticate krte time
//  passport.authenticate("local",{
//   failureRedirect: "/login", 
//   failureFlash: true,
//  }),
//   async(req, res)=>{
// req.flash("success", "Welocme to Wanderlust!");
//  let redirectUrl = res.locals.redirectUrl || "/listings";
//  res.redirect(redirectUrl);// visit lecture again 57 ka 5 yeh simple bypaas hai vaise tum jaise edit vale page ko access krne ke logoin krte fr listings vale page pr chle jate ar agr listing vale page me jake krte to
// //sabme vhi krna pdta ab jo session ke andr url save hoga seedhe  uspe redirect ho jayega bs middleware me jake lihna thoda
// });

//middleware to authenticate user h ya nhi
// router.post(
//   "/login",
//   saveRedirectUrl,// yha pe hm authrnticate krne se phle hi save krva rhe hai to kyuki paaasport sesion ko empty kr deta hai authnticate krte time
//  passport.authenticate("local",{
//   failureRedirect: "/login", 
//   failureFlash: true,
//  }),
//   userController.login
//  );

//5
// //logout
// router.get("/logout", (req, res, next)=>{
//   req.logout((err)=>{
//     if(err){
//   return next(err);
//     }
//     req.flash("success", "you are logged out!");
//     res.redirect("/listings");
//   })
// })

//logout
router.get("/logout", userController.logout);


module.exports = router;