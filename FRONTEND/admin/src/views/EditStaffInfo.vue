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
        <h3>Edit Staff Info</h3>

        <form @submit="updateStaff">
          <div class="mb-3">
            <label for="staff_name" class="form-label">Staff Name</label>
            <input
              type="text"
              id="staff_name"
              class="form-control"
              v-model="staff.staff_name"
              required
            />
          </div>

          <div class="mb-3">
            <label for="staff_role" class="form-label">Role</label>
            <input
              type="text"
              id="staff_role"
              class="form-control"
              v-model="staff.staff_role"
              required
            />
          </div>

          <div class="mb-3">
            <label for="staff_address" class="form-label">Address</label>
            <input
              type="text"
              id="staff_address"
              class="form-control"
              v-model="staff.staff_address"
              required
            />
          </div>

          <div class="mb-3">
            <label for="staff_phone" class="form-label">Phone</label>
            <textarea
              id="staff_phone"
              class="form-control"
              v-model="staff.staff_phone"
              required
            ></textarea>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import staffService from "@/services/staff.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      route: useRoute(),
      staff: {
        staff_name: "",
        staff_role: "",
        staff_address: "",
        staff_phone: "",
      },
    };
  },
  methods: {
    async fetchStaffData() {
      const staffId = this.$route.params.id;

      try {
        const response = await staffService.get(staffId);

        this.staff = response.data.data;
      } catch (error) {
        console.error("Error fetching reader data", error);
      }
    },

    async updateStaff() {
      try {
        await staffService.update(this.staff);
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
    this.fetchStaffData();
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
