import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">How do I register for an account?</h2>
        <p>
          To register for an account, click on the 'Register' button on the homepage and fill in the required details. You will receive a verification email to complete the registration process.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">What should I do if I forget my password?</h2>
        <p>
          If you forget your password, click on the 'Forgot Password' link on the login page. You will be prompted to enter your registered email address, and a password reset link will be sent to you.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">How do I deposit funds into my account?</h2>
        <p>
          To deposit funds, go to the 'Deposit' section under your account. Follow the instructions to complete the deposit process using your preferred payment method.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">How can I contact support?</h2>
        <p>
          If you need assistance, you can contact our support team through the 'Contact Us' page. We are here to help you with any issues or questions you may have.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
