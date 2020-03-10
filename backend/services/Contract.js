const axios = require('axios');
const createAuth = require('../utils/create-auth');

const {
  CONTRACT_CALL_ENDPOINT,
  DEALER_NODE_ADDRESS,
  DEALER_AUTH_USERNAME,
  DEALER_AUTH_PASSWORD
} = process.env;

exports.getData = getData;
exports.updateData = updateData;

async function getData(vin) {
  const response = await axios.get(
    `${CONTRACT_CALL_ENDPOINT}/getData?vin=${vin}&kld-from=${DEALER_NODE_ADDRESS}`,
    {
      headers: {
        Authorization: createAuth(DEALER_AUTH_USERNAME, DEALER_AUTH_PASSWORD)
      }
    }
  );
  return response.data;
}

async function updateData(payload) {
  return await axios.post(
    `${CONTRACT_CALL_ENDPOINT}/updateData?kld-from=${DEALER_NODE_ADDRESS}&kld-sync=true`,
    payload,
    {
      headers: {
        Authorization: createAuth(DEALER_AUTH_USERNAME, DEALER_AUTH_PASSWORD)
      }
    }
  );
}
