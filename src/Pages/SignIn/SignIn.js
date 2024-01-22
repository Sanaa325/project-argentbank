import React from 'react';
import Background from "../../Components/Background/Background"
import Footer from '../../Components/Footer/Footer';
import SignInContent from "../../Components/SignInContent/SignInContent";
import Header from '../../Components/Header/Header';

const SignIn = () => {
  return (
    <div className='page-signin'>
      <Header />
      <Background>
        <SignInContent />
      </Background>


      <Footer />
    </div>
  );
};

export default SignIn;