const FormData = require('form-data');
const axios = require('axios');
const createAuth = require('../utils/create-auth');

const { IPFS_ENDPOINT, AAA_AUTH_USERNAME, AAA_AUTH_PASSWORD } = process.env;

exports.addData = addData;
exports.getData = getData;

async function addData(serviceHistory) {
  const data = await createFormData(serviceHistory);
  const response = await axios.post(IPFS_ENDPOINT + 'add', data, {
    headers: {
      Authorization: createAuth(AAA_AUTH_USERNAME, AAA_AUTH_PASSWORD),
      ...data.getHeaders()
    }
  });
  return response.data.Hash;
}

async function getData(hash) {
  const response = await axios.get(IPFS_ENDPOINT + `cat/${hash}`, {
    headers: {
      Authorization: createAuth(AAA_AUTH_USERNAME, AAA_AUTH_PASSWORD)
    }
  });
  return response;
}

async function createFormData(data) {
  const form = new FormData();
  const jsonContent = JSON.stringify(data);
  form.append('content', jsonContent);
  return form;
}
