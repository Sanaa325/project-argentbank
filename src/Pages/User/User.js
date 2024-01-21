import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Account from '../../Components/Account/Account';
import HeaderAccount from '../../Components/HeaderAccount/HeaderAccount';
import CustomHeader from "../../Components/CustomHeader/CustomHeader";




const User = () => {
    
    return (
        <>
        <CustomHeader />
        
            <main className="main bg-dark">
                
            <HeaderAccount />
                
                <Account
                    accountType="Checking"
                    accountNumber="x8349"
                    amount="2,082.79"
                    description="Available Balance"
                />
                <Account
                    accountType="Savings"
                    accountNumber="x6712"
                    amount="10,928.42"
                    description="Available Balance"
                />
                <Account
                    accountType="Credit Card"
                    accountNumber="x8349"
                    amount="184.30"
                    description="Current Balance"
                />
            </main>
            <Footer />
        </>
    );
};

export default User;