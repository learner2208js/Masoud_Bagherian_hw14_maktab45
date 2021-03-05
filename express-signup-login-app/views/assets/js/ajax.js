function ajax(options, callback) {
  // console.log(options);
  const http = new XMLHttpRequest();
  function getRosponse() {
    if (this.readyState === 4) {
      callback(this.response);
    }
  }

  http.open(options.method, options.url);
  if (options.method.toLowerCase() !== 'get') {
    http.setRequestHeader('content-type', 'application/json');
    http.send(JSON.stringify(options.data));
  } else {
    http.send();
  }
  http.addEventListener('readystatechange', getRosponse);
}
