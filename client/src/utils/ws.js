export function listen(method, callback) {
  this.onmessage = (data) => {
    const { result } = JSON.parse(data.data);
    if (result.method === method) {
      callback(result);
    }
  };
}
