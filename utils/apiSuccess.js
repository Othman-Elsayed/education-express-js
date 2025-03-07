class ApiSuccess {
  constructor(message, data, totalPages) {
    this.status = "success";
    this.message = message || "Fetch data successfully";
    this.totalPages = totalPages;
    this.data = data;
  }
}

module.exports = ApiSuccess;
