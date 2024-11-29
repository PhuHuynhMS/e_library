import { jwtDecode } from "jwt-decode";
import createApiClient from "./api.service";
class StaffService {
  constructor(baseUrl = "/api/v1/staffs") {
    this.api = createApiClient(baseUrl);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      this.account_id = decodedToken.tokenPayload.account_id;
    }
  }

  async getMe() {
    try {
      return await this.api.get(`/${this.account_id}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new StaffService();
