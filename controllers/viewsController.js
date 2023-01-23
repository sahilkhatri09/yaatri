const Tour = require('../models/tourModel');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel')
const Booking = require('../models/bookingModel')

exports.getOverview =catchAsync (async (req ,res)=>{
    // 1) Get tour data from the collection
    const tours = await Tour.find();

    //2 ) Build template

    //3) Render that template using tour data from 1
  res.status(200).render('overview',{
    title : 'All Tours',
    tours
  });
})

exports.getTour =catchAsync (async (req ,res,next)=>{
  //1) get the data , for the requested tour(including review and guides)
  // console.log(req.params.slug);
  const tour = await Tour.findOne({slug:req.params.slug}).populate({
    path : 'reviews',
    fields:'review rating user'
  });
  if(!tour){
    return next(new AppError('There is no Tour with this name',404));
  }
  
  res.status(200).render('tour',{
    title :  `${tour.name} Tour`,
    tour
  });
})

exports.getLoginForm = (req,res)=>{
  res.status(200).render('login',{
    title:'Log into your accound'
  })
}

exports.getSignUpForm = (req,res)=>{
  res.status(200).render('signUp',{
    title:'Log into your accound'
  })
}

exports.getAccount = (req,res) =>{
  res.status(200).render('account',{
    title:'Your account'
  });
}

exports.getMyTours =catchAsync (async(req,res,next)=>{
  // 1) Find all bookings
  const bookings = await Booking.find({user:req.user.id});

  //2) Find tours with the returned IDs
  const tourIDs = bookings.map(el =>el.tour);
  const tours = await Tour.find({_id:{$in:tourIDs}});

  res.status(200).render('overview',{
    title:'My Tours',
    tours
  })
})
exports.updateUserData =async (req,res,next) =>{
  const updatedUser  = await User.findByIdAndUpdate(req.user.id,{
    name : req.body.name,
    email:req.body.email
  },{
    new : true,
    runValidators:true
  });
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });

}
