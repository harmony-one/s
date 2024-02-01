import React, { useState } from 'react';
import { TextField, Box, styled } from '@mui/material';

const StyledTextField = styled(TextField)({
  margin: '0 0.25em',
  width: '4em', // Adjust the width as needed
  '& input': {
    textAlign: 'center',
    fontSize: '1.5rem', // Adjust the font size as needed
  },
});

function emojiToHex(emoji) {
  const codePoint = emoji.codePointAt(0);
  return codePoint.toString(16);
}

const EmojiInput = ({emojis, setEmojis}) => {
  const handleChange = (index) => (event) => {
    const value = event.target.value;

    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

    if (emojiRegex.test(value)) {
      const updatedEmojis = [...emojis];
      updatedEmojis[index] = value;
      setEmojis(updatedEmojis);

      if (value && index < 2) {
        document.getElementById(`emoji-field-${index + 1}`).focus();
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      {emojis.map((emoji, index) => (
        <StyledTextField
          key={index}
          id={`emoji-field-${index}`}
          type="text"
          value={emoji}
          onChange={handleChange(index)}
          inputProps={{ maxLength: 1 }}
        />
      ))}
    </Box>
  );
};

export default EmojiInput;
