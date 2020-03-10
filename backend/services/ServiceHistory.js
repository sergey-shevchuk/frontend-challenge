const Ipfs = require('./Ipfs');
const Contract = require('./Contract');

exports.getByVin = getByVin;
exports.update = update;

async function getByVin(vin) {
  const response = await Contract.getData(vin);
  const { output } = response;
  if (!output) {
    return null;
  }
  const { data } = await Ipfs.getData(output);
  return data;
}

async function update(vin, serviceHistory) {
  const ipfsHash = await Ipfs.addData(serviceHistory);
  console.log('ipfsHash', ipfsHash);
  const payload = {
    data: ipfsHash,
    vin
  };
  const response = await Contract.updateData(payload);
  return response;
}
