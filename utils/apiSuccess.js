class ApiSuccess {
  constructor(message, data) {
    this.status = "success";
    this.message = message || "Fetch data successfully";
    this.data = data;
  }
}

module.exports = ApiSuccess;
