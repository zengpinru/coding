class CusRequest {
  constructor(options = {}) {
    const {
      responseAdapter = res => res,
      paramsAdapter = params => params,
    } = options;
    this.responseAdapter = responseAdapter;
    this.paramsAdapter = paramsAdapter;
  }

  async http(url) {
    const res = await fetch(url);
    const json = await res.json();
    return this.responseAdapter(json);
  }
}

const request = new CusRequest({});
