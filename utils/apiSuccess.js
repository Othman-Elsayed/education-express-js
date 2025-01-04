class ApiSuccess {
  constructor(data, message) {
    this.status = "success";
    this.message = message || "Fetch data successfully";
    this.data = data;
  }
}

module.exports = ApiSuccess;
