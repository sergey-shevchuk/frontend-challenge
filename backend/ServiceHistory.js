const axios = require('axios');
const { getDataIpfs } = require('./test');

const dealerNode =
  'https://u0qnrq5krc-u0cprsahff-connect.us0-aws.kaleido.io/instances/0x3347d6a26c6d095b432c47160bc8360d5cbf0f57';

const dealerNodeAddress = '0xEc0B941A0B51C7E4974adAE7C874989E16239808';
const DEALER_AUTH_USERNAME = 'u0s18ui894';
const DEALER_AUTH_PASSWORD = 'ozL0_zzdT2Ugw5i9jkv-PnES0L-lPTgVlWMaFmDyEyM';

exports.getByVin = getByVin;

async function getByVin(vin) {
  const response = await axios.get(
    `${dealerNode}/getData?kld-from=${dealerNodeAddress}&vin=${vin}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${DEALER_AUTH_USERNAME}:${DEALER_AUTH_PASSWORD}`
        ).toString('base64')}`
      }
    }
  );
  console.log(response.data.output);
  const { output } = response.data;
  if (!output) {
    return null;
  }
  const { data } = await getDataIpfs(output);
  return data;
}
