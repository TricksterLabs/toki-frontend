import axios from 'axios';

const data = {
  session: 'ok3H9ea2gquSpJM6fQgo',
  order_id: 2,
  network: "btc-mainnet",
  order_vbytes_cost: 3,
  customer_addresses: [
    'bc1pmp6vczk548g4dzyldean0vklqexpgvg69s425pdrw7dr2f39j93secucmm',
    'bc1pmp6vczk548g4dzyldean0vklqexpgvg69s425pdrw7dr2f39j93secucmm',
  ]
};

try {
  const response = await axios.post('https://api.inscribe.to.ki/submit', data);
  const json = response.data;
  console.log(json);
} catch (error) {
  console.error(error.message + ": " + error.response.data);
}
