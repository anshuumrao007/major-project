 const express = require("express");
const router = express.Router({mergeParams: true});//jo iske andr likha hai vo review ki id ko yha tak lata hai nhi to app.js tak aa pati  hai 
const wrapAsync= require("../utils/wrapasync.js"); //to handle error
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,  reviewSchema }=require("../schema.js");//use to validate the nboth schema listings and reviews
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn , isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");

// const validateReview=((req, res, next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400, errMsg);
//      }else{
//         next();
//      }
// })



// create reviews ka post route

//  router.post("/",
//  isLoggedIn,
//  validateReview, 
//  wrapAsync (async (req, res)=>{//wrapasync err handling ke liye hai bs
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review (req.body.review);//jo req.body me review aaya hai vo newReview me le liya hai
//     newReview.author = req.user._id; //ab review ke sath author bhi save hoga
//     console.log(newReview);
//     listing.reviews.push(newReview);//review ko reviews nam ke array me push kr diya jo review ke schema bnaya tha
//     await newReview.save();
//     await listing.save();
//     console.log("new review saved");
//     req.flash("success", "New Review Created!");
//      res.redirect(`/listings/${listing._id}`);
//     }));


//create review
 router.post("/",
 isLoggedIn,
 validateReview, 
 wrapAsync (reviewController.createReview));
    
    //Delete review
   //  router.delete(
   //      "/:reviewId",//common part cut kr do
   //       isLoggedIn,//check frist user loggedin or not
   //      isReviewAuthor,
   //       wrapAsync(async(req, res) => {
   //    let {id, reviewId} = req.params;
    
   //    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId}});//means listing me bhut sare review the to hmne usme se jisse  hmari reviewId match hui us review ko pull oprator se pull kr diya
   //    await Review.findByIdAndDelete(reviewId);//reviews collections se review delete ho gya
   //    req.flash("success", "Review Deleted!");
   //   res.redirect(`/listings/${id}`);
   //       })
   //       );

   //delete review
   router.delete(
      "/:reviewId",//common part cut kr do
      isLoggedIn,//check frist user loggedin or not
      isReviewAuthor,
       wrapAsync(reviewController.destroyReview));
    
    module.exports = router;