import React, { useState } from 'react';
import { TextField, Box, useTheme, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: '0 0.25em',
  '& input': {
    textAlign: 'center',
    fontSize: '2rem',
    width: '1.5em',
    height: '2em',
  },
}));

const OTPInput = () => {
  const theme = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index) => (e) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1).replace(/[^0-9]/g, '');
    setOtp(newOtp);

    if (index < 3 && newOtp[index] !== '') {
      document.getElementById(`otp-field-${index + 1}`).focus();
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      {otp.map((digit, index) => (
        <StyledTextField
          key={index}
          id={`otp-field-${index}`}
          type="tel"
          value={digit}
          onChange={handleChange(index)}
          inputProps={{ maxLength: 1 }}
          theme={theme}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
