import createApiClient from "./api.service";
class ReaderService {
  constructor(baseUrl = "/api/v1/readers") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return await this.api.get("/");
  }

  async get(id) {
    return await this.api.get(`/readers/${id}`);
  }

  async delete(id) {
    return await this.api.delete(`/${id}`);
  }

  async update(data) {
    return await this.api.put(`/${data._id}`, data);
  }
}

export default new ReaderService();
