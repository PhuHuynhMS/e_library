import { jwtDecode } from "jwt-decode";
import createApiClient from "./api.service";
class ReaderService {
  constructor(baseUrl = "/api/v1/readers") {
    this.api = createApiClient(baseUrl);
  }

  async getMe() {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      return await this.api.get(`/${decodedToken.tokenPayload.account_id}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ReaderService();
