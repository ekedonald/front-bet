import React from 'react';

const GettingStarted: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
      <p className="mb-4">
        To get started with our application, follow these simple steps:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">
          <strong>Register an Account:</strong> Go to the registration page and fill in your details to create a new account.
        </li>
        <li className="mb-2">
          <strong>Verify Your Email:</strong> Check your email for a verification link. Click on the link to verify your email address.
        </li>
        <li className="mb-2">
          <strong>Login to Your Account:</strong> Use your registered email and password to log in to your account.
        </li>
        <li className="mb-2">
          <strong>Complete Your Profile:</strong> Add additional information to your profile, such as a profile photo and contact details.
        </li>
        <li className="mb-2">
          <strong>Start Using the Services:</strong> Explore the various features of our platform, including transactions, bets, and more.
        </li>
      </ol>
      <p className="mb-4">
        If you encounter any issues during the setup process, please refer to the FAQ section or contact our support team for assistance.
      </p>
    </div>
  );
};

export default GettingStarted;
