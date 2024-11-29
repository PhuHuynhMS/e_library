import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api/v1/books") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    const data = await this.api.get("/");
    return data.data;
  }

  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (
      await this.api.put(`/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new BookService();
