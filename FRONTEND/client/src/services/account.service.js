import createApiClient from "./api.service";
import { jwtDecode } from "jwt-decode";
class AccountService {
  constructor(baseUrl = "/api/v1/accounts") {
    this.api = createApiClient(baseUrl);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      this.account_id = decodedToken.tokenPayload.account_id;
    }
  }

  async login(data) {
    return await this.api.post("/auth", data);
  }

  async register(data) {
    return await this.api.post("/reader", data);
  }

  async changePassword(data) {
    try {
      const response = await this.api.put(
        `/change-password/${this.account_id}`,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AccountService();
