<template>
  <div class="container-fluid">
    <!-- Sidebar -->
    <div class="row">
      <div class="col-md-3 col-lg-2 bg-dark text-white p-4 sidebar">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link text-white"
              :class="{ active: route.path === '/' }"
              >Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/reader-info"
              class="nav-link text-white"
              :class="{ active: route.path === '/reader-info' }"
              >Reader Info</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/staff-info"
              class="nav-link text-white"
              :class="{ active: route.path === '/staff-info' }"
              >Staff Info</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="col-md-9 col-lg-10 p-4">
        <h3>Edit Reader Info</h3>

        <form @submit="updateReader">
          <div class="mb-3">
            <label for="reader_firstname" class="form-label">First Name</label>
            <input
              type="text"
              id="reader_firstname"
              class="form-control"
              v-model="reader.reader_firstname"
              required
            />
          </div>

          <div class="mb-3">
            <label for="reader_lastname" class="form-label">Last Name</label>
            <input
              type="text"
              id="reader_lastname"
              class="form-control"
              v-model="reader.reader_lastname"
              required
            />
          </div>

          <div class="mb-3">
            <label for="reader_gender" class="form-label">Gender</label>
            <select
              id="reader_gender"
              class="form-control"
              v-model="reader.reader_gender"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="reader_address" class="form-label">Address</label>
            <textarea
              id="reader_address"
              class="form-control"
              v-model="reader.reader_address"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="reader_phone" class="form-label">Phone</label>
            <input
              type="tel"
              id="reader_phone"
              class="form-control"
              v-model="reader.reader_phone"
              required
            />
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import readerService from "@/services/reader.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      route: useRoute(),
      reader: {
        reader_firstname: "",
        reader_lastname: "",
        reader_birthday: "",
        reader_gender: "Male",
        reader_address: "",
        reader_phone: "",
      },
    };
  },
  methods: {
    async fetchReaderData() {
      const readerId = this.$route.params.id;

      try {
        const response = await readerService.get(readerId);

        this.reader = response.data.data;
      } catch (error) {
        console.error("Error fetching reader data", error);
      }
    },

    async updateReader() {
      try {
        await readerService.update(this.reader);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reader info updated successfully!",
          timer: 1500,
        });
        this.$router.push("/reader-info");
      } catch (error) {
        console.error("Error updating reader data", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    },
  },
  mounted() {
    this.fetchReaderData();
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
}

.form-label {
  font-weight: bold;
}

.container-fluid {
  padding: 0;
}

.nav-link:hover {
  background-color: #575757;
}
</style>
