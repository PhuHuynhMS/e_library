import { jwtDecode } from "jwt-decode";
import createApiClient from "./api.service";

class BorrowingDetailService {
  constructor(baseUrl = "/api/v1/borrowingDetails") {
    this.api = createApiClient(baseUrl);

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      this.account_id = decoded.tokenPayload.account_id;
    }
  }

  async create(data) {
    if (this.account_id) {
      data.account_id = this.account_id;
    }
    return (await this.api.post("/", data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getById(id) {
    return (await this.api.get(`/borrowing-details/${id}`)).data;
  }

  async getAll(userId) {
    return (await this.api.get(`/${userId}`)).data;
  }

  async getAllRenewalDetails() {
    const status = "RENEWAL";

    return (await this.api.get(`/${this.account_id}/status/${status}`)).data;
  }

  async getAllRenewalRequests() {
    const status = "PENDING";

    return (await this.api.get(`/${this.account_id}/status/${status}`)).data;
  }

  async getAllBorrowedDetails() {
    return (await this.api.get(`/${this.account_id}/borrowed-details`)).data;
  }

  async getAllReturnedDetails() {
    return (await this.api.get(`/returned-books/${this.account_id}`)).data;
  }

  async renew(detail) {
    return (await this.api.put(`/renew/${this.account_id}`, detail)).data;
  }

  async reject(detail) {
    return (await this.api.put(`/reject/${this.account_id}`, detail)).data;
  }
}

export default new BorrowingDetailService();
