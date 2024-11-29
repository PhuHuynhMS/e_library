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

        <form @submit="createStaff">
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
            <select
              id="staff_role"
              class="form-control"
              v-model="staff.staff_role"
              required
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
            </select>
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
            <input
              id="staff_phone"
              class="form-control"
              v-model="staff.staff_phone"
              required
            />
          </div>
          <div class="mb-3">
            <label for="account_name" class="form-label">Username</label>
            <input
              type="text"
              id="account_name"
              class="form-control"
              v-model="staff.account_name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="account_password" class="form-label">Password</label>
            <input
              type="password"
              id="account_password"
              class="form-control"
              v-model="staff.account_password"
              required
            />
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Add</button>
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
import accountService from "@/services/account.service";

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
        account_name: "",
        account_password: "",
        account_role: "",
      },
    };
  },
  methods: {
    async createStaff() {
      try {
        await accountService.registerStaff(this.staff);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Staff info added successfully!",
          timer: 1500,
        });
        this.route.push("/staff-info");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    },
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
