module.exports = createAuth;

function createAuth(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}
