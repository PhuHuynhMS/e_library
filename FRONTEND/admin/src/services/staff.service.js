import createApiClient from "./api.service";
class StaffService {
  constructor(baseUrl = "/api/v1/staffs") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return await this.api.get("/");
  }

  async get(id) {
    return await this.api.get(`/staffs/${id}`);
  }

  async create(data) {
    return await this.api.post("/", data);
  }

  async delete(id) {
    return await this.api.delete(`/${id}`);
  }

  async update(data) {
    return await this.api.put(`/${data._id}`, data);
  }
}

export default new StaffService();
