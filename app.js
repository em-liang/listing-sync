const axios = require('axios');
const qs = require('qs');

require('dotenv').config()

const getEBayOAuthToken = async () => {
  const tokenUrl = process.env.SandboxURL //change to SandboxURL or ProductionURL appropriately in .env file
  const auth = Buffer.from(`${process.env.AppID}:${process.env.CertID}`).toString('base64');

  try {
    const response = await axios.post(
      tokenUrl,
      qs.stringify({
        grant_type: 'client_credentials',
        scope: process.env.OAuthScope //change to appropriate scope in .env file
      }),
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('OAuth Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting OAuth token', error);
  }
};

getEBayOAuthToken();