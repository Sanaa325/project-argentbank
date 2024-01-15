import React from 'react';

import Footer from '../../Components/Footer/Footer';
import SignInContent from "../../Components/SignInContent/SignInContent";
import Header from '../../Components/Header/Header';

const SignIn = () => {
  return (
    <div className='page_signin'>
      <Header/>
      
      <SignInContent />
      <Footer />
    </div>
  );
};

export default SignIn;