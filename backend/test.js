const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const url = 'https://u0qnrq5krc-u0ahyajkju-ipfs.us0-aws.kaleido.io/api/v0/';

const KALEIDO_AUTH_USERNAME = 'u0bvovag47';
const KALEIDO_AUTH_PASSWORD = 'hhj93KUEzi1-AGpPrD7qYqPS1G1QexJGhunuc_2kUXI';

const dealerNode =
  'https://u0qnrq5krc-u0cprsahff-connect.us0-aws.kaleido.io/instances/0x3347d6a26c6d095b432c47160bc8360d5cbf0f57';
const DEALER_AUTH_USERNAME = 'u0s18ui894';
const DEALER_AUTH_PASSWORD = 'ozL0_zzdT2Ugw5i9jkv-PnES0L-lPTgVlWMaFmDyEyM';

const DEALERCREDENTIALS =
  'u0s18ui894:ozL0_zzdT2Ugw5i9jkv-PnES0L-lPTgVlWMaFmDyEyM';

const createFormData = async object => {
  let form = new FormData();

  const jsonContent = JSON.stringify(object);

  form.append('content', jsonContent);
  return form;
};
// you need to pass a formData
async function addDataIpfs(data) {
  try {
    const response = await axios.post(url + 'add', data, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`
        ).toString('base64')}`,
        ...data.getHeaders()
      }
    });
    console.log(response.data);
    return response.data.Hash;
    // console.log(response);
  } catch (error) {
    // console.error(error);
  }
}

async function getDataIpfs(hash) {
  try {
    const response = await axios.get(url + `cat/${hash}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`
        ).toString('base64')}`
      }
    });
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err.response.status);
  }
}
const dealerNodeAddress = '0xEc0B941A0B51C7E4974adAE7C874989E16239808';
getFromContract = async (from, vin) => {
  try {
    const response = await axios.get(
      `${dealerNode}/getData?vin=${vin}&kld-from=${from}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(DEALERCREDENTIALS).toString(
            'base64'
          )}`
        }
      }
    );
    console.log(response.data);
    return response.data.output;
  } catch (err) {
    // console.log(err.response);
  }
};

const updateContract = async (vin, serviceHistory) => {
  try {
    const form = await createFormData(serviceHistory);
    const ipfsHash = await addDataIpfs(form);
    console.log('updateContract', ipfsHash);
    const payload = {
      data: ipfsHash,
      vin
    };
    const response = await axios.post(
      `${dealerNode}/updateData?kld-from=${dealerNodeAddress}&kld-sync=true`,
      payload,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(DEALERCREDENTIALS).toString(
            'base64'
          )}`
        }
      }
    );
    console.log('test', response.data);
  } catch (err) {
    console.log(err);
  }
};

exports.updateContract = updateContract;
exports.getDataIpfs = getDataIpfs;

const object = {
  car: 'Bl',
  service: 'all',
  approved: 'test'
};

// updateContract(dealerNodeAddress, "2C3HD46asdfasdfR4WH170", object);

// QmNkxLMS2gvStuVzTpCtfMzr33bRUuMa6ooJ9VZ6NLVzPT;
// QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH

// (async function() {
//   const hash = await getFromContract(dealerNodeAddress, "2C3HD46asdfasdfR4WH170");
//   console.log(hash);
//   const data = await getDataIpfs(hash);
//   console.log(data);
// })();
