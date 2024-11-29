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

        <h3>Account count: {{ filteredItemsCount }}</h3>

        <!-- Table -->
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item._id">
                <td>{{ item.account_name }}</td>
                <td>{{ item.account_role }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                  <button class="btn btn-primary btn-sm">Edit</button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteItem(item)"
                  >
                    Delete
                  </button>
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
import accountService from "@/services/account.service";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      route: useRoute(),
      searchQuery: "",
      items: [],
    };
  },
  methods: {
    async fetchItems() {
      try {
        const response = await accountService.getAll();
        console.log(response);

        this.items = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (!result.isConfirmed) return;

        await accountService.delete(item._id);
        this.fetchItems();
      } catch (error) {
        console.log(error);
      }
    },
    navigateToAdd() {
      this.$router.push("/add-account");
    },
  },
  computed: {
    itemStrings() {
      return this.items.map((item, index) => {
        const { account_name, account_role, createdAt } = item;
        return [account_name, account_role, createdAt].join("");
      });
    },
    filteredItems() {
      if (!this.searchQuery) return this.items;
      return this.items.filter((_item, index) => {
        return this.itemStrings[index].includes(this.searchQuery);
      });
    },
    filteredItemsCount() {
      const filteredItems = this.filteredItems;

      return filteredItems.length;
    },
  },

  mounted() {
    this.fetchItems();
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
