
const  bookTour =async tourId => {
  try{
  const stripe = Stripe('pk_test_51MT7SpSFcFmT8ZfJKP8DG75mzsfCYjcrQbCGxxoqkxYEBWZ9QqmPRbmTaaWD6xY4vnNnwWFdlWUo5BQ7XgogvMZ200gz51YQgb')

  // 1)  Get checkout session from API
  const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
  // console.log(session);
  // 2) Create checkout form + charge credit card
  await stripe.redirectToCheckout({
    sessionId:session.data.session.id
  });

  }catch(err){
    console.log(err);
    showAlert('error',err);
  }
}

const bookBtn = document.getElementById('book-tour');

if(bookBtn){
  bookBtn.addEventListener('click',e =>{
    e.target.textContent = 'Processing..'
    const {tourId} = e.target.dataset;
    bookTour(tourId);
  })
}