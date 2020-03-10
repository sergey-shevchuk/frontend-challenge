export default function parseError(error) {
  return (
    error && ((error.response && error.response.data.message) || error.message)
  );
}
