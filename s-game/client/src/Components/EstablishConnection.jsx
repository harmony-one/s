import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import OTPInput from '../Components/OTPInput';
import EmojiInput from './EmojiInput';

function emojiToHex(emoji) {
    const codePoint = emoji.codePointAt(0);
    return codePoint.toString(16);
  }
  
const EstablishConnection = ({myOTP}) => {
  const [emojis, setEmojis] = useState(['', '', '']);

  const handleAddConnection = () => {
    const hexEmojis = emojis.map(emoji => emojiToHex(emoji)).join('');
    console.log('Hex Emojis:', hexEmojis);
    // Add additional logic for what happens when the button is clicked
  };

  return (
    <div>
        <Typography variant="h5">Add Connection</Typography>
        <Typography variant='h6'>Your OTP:</Typography>
        <Typography variant="h3">{myOTP}</Typography>
        <Typography variant='h6'>Their OTP:</Typography>
        <OTPInput />
        <Typography variant='h6'>3 emojis:</Typography>
        <Typography variant='text'>(You and your partner choose the same set of emojis.)</Typography>
        <EmojiInput emojis={emojis} setEmojis={setEmojis} />
        <Button variant='contained' sx={{marginTop: 1}} onClick={handleAddConnection}>Add Connection</Button>
    </div>
  )
}

export default EstablishConnection