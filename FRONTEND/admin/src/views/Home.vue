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
        <div class="mb-4">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search..."
          />
        </div>

        <!-- Table -->
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Example data, replace with dynamic data from API -->
              <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
                <td>
                  <button class="btn btn-primary btn-sm">Edit</button>
                  <button class="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      route: useRoute(),
      searchQuery: "",
      items: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Reader",
        },
        {
          id: 3,
          name: "Mark Wilson",
          email: "mark@example.com",
          role: "Staff",
        },
        // Add more items here
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
}
.container-fluid {
  padding: 0;
}

.nav-link:hover {
  background-color: #575757;
}

.table th,
.table td {
  text-align: center;
}

.table th {
  background-color: #f8f9fa;
}
</style>
