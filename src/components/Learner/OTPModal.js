import React, { useEffect, useRef, useState } from 'react';
import "./css/OTPModal.css";
import ResetPasswordModal from "./ResetPasswordModal"; 

const OTPModal = ({ otpCode, setOtpCode, onSubmit, onClose, email }) => {
  const modalRef = useRef(null);
  const inputRefs = useRef([]); 
  const [otp, setOtp] = useState(Array(6).fill('')); // Initialize OTP as an array of 6 empty strings
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp); // Update the OTP state

    // Update the parent component's OTP state
    setOtpCode(newOtp.join(''));

    // Move focus to the next input field if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Move focus to the previous input field if backspace is pressed
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const success = await onSubmit();
    if (success) {
      setIsOtpVerified(true); // OTP verified, trigger Reset Password Modal
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle paste event for OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6); // Get only the first 6 characters
    const newOtp = pasteData.split('').slice(0, 6); // Split into an array of characters
    setOtp(newOtp); // Update the OTP state
    setOtpCode(newOtp.join('')); // Update the parent component's OTP state

    // Focus on the last input field after pasting
    if (newOtp.length === 6) {
      inputRefs.current[5].focus();
    }
  };

  return (
    <>
      {!isOtpVerified ? (
        <div className="otp-modal">
          <div className="otp-container" ref={modalRef}>
            <h2>OTP Verification</h2>
            <p>
              Verify your account using the six-digit code sent to <strong>{email}</strong>
            </p>
            <div className="otp-inputs">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ''}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={(e) => {
                    // Handle backspace key
                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                      inputRefs.current[index - 1].focus();
                    }
                  }}
                />
              ))}
            </div>
            <p className="resend">
              Didn't get a code? <span className="resend-link">click to resend</span>
            </p>
            <button className="verify-btn" onClick={handleVerifyOtp}>Verify account ➤</button>
            <button className="close-btn" onClick={onClose}>✖</button>
          </div>
        </div>
      ) : (
        <ResetPasswordModal isOpen={true} onClose={onClose} />
      )}
    </>
  );
};

export default OTPModal;
