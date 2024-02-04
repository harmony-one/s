import React from 'react';
import { Typography, Box } from '@mui/material';

import EmailIcon from '../assets/icons/email_icon.svg';
import FacebookIcon from '../assets/icons/facebook_icon.svg';
import GithubIcon from '../assets/icons/github_icon.svg';
import InstagramIcon from '../assets/icons/instagram_icon.svg';
import LinkedinIcon from '../assets/icons/linkedin_icon.svg';
import PinterestIcon from '../assets/icons/pinterest_icon.svg';
import RedditIcon from '../assets/icons/reddit_icon.svg';
import SkypeIcon from '../assets/icons/skype_icon.svg';
import SnapchatIcon from '../assets/icons/snapchat_icon.svg';
import SoundcloudIcon from '../assets/icons/soundcloud_icon.svg';
import SpotifyIcon from '../assets/icons/spotify_icon.svg';
import TwitterIcon from '../assets/icons/twitter_icon.svg';
import VimeoIcon from '../assets/icons/vimeo_icon.svg';
import WechatIcon from '../assets/icons/wechat_icon.svg';
import WhatsappIcon from '../assets/icons/whatsapp_icon.svg';
import YelpIcon from '../assets/icons/yelp_icon.svg';
import YoutubeIcon from '../assets/icons/youtube_icon.svg';

const Auth = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',    // Display icons in a column
        alignItems: 'center',       // Horizontally center the icons
        height: '100vh',            // Set the container height to full viewport height
      }}
    >
      <Typography variant="h3">s.country</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Horizontally center the icons within this container
          flexWrap: 'wrap',         // Allow icons to wrap to the next line
          maxWidth: '80%',          // Limit the container width
        }}
      >
        <img width="5%" src={EmailIcon} alt="email icon" />
        <img width="5%" src={FacebookIcon} alt="facebook icon" />
        <img width="5%" src={GithubIcon} alt="github icon" />
        <img width="5%" src={InstagramIcon} alt="insta icon" />
        <img width="5%" src={LinkedinIcon} alt="linkedin icon" />
        <img width="5%" src={PinterestIcon} alt="pinterest icon" />
        <img width="5%" src={RedditIcon} alt="reddit icon" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Horizontally center the icons within this container
          flexWrap: 'wrap',         // Allow icons to wrap to the next line
          maxWidth: '80%',          // Limit the container width
        }}
      >
        <img width="5%" src={SkypeIcon} alt="skype icon" />
        <img width="5%" src={SnapchatIcon} alt="snapchat icon" />
        <img width="5%" src={SoundcloudIcon} alt="soundcloud icon" />
        <img width="5%" src={SpotifyIcon} alt="spotify icon" />
        <img width="5%" src={TwitterIcon} alt="twitter icon" />
        <img width="5%" src={VimeoIcon} alt="vimeo icon" />
        <img width="5%" src={WechatIcon} alt="wechat icon" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Horizontally center the icons within this container
          flexWrap: 'wrap',         // Allow icons to wrap to the next line
          maxWidth: '80%',          // Limit the container width
        }}
      >
        <img width="5%" src={WhatsappIcon} alt="whatsapp icon" />
        <img width="5%" src={YelpIcon} alt="yelp icon" />
        <img width="5%" src={YoutubeIcon} alt="youtube icon" />
      </Box>
    </Box>
  )
}

export default Auth;
