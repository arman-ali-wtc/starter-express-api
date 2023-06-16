const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
const https = require('https');

app.set('view engine', 'ejs');

app.use(express.static('public'));

const agent = new https.Agent({
  rejectUnauthorized: false
});

const axiosInstance = axios.create({
  httpsAgent: agent
});

app.get('/', (req, res) => {
  // Call your Spring API to retrieve the product data
  // Replace the placeholder URL with the actual URL of your Spring API
  // Make sure the Spring API is running and accessible
  const apiUrl = 'https://3.109.208.238/purchase';
  axiosInstance.get(apiUrl)
    .then(response => {
      const products = response.data;
      res.render('dashboard', { products });
    })
    .catch(error => {
      console.error(error);
      res.render('error', { error: 'Failed to fetch data' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
