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
        <h3>Reader count: {{ filteredItemsCount }}</h3>

        <!-- Table -->
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Reader ID</th>
                <th>First Name</th>
                <th>last Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item._id">
                <td>{{ item.reader_id }}</td>
                <td>{{ item.reader_firstname }}</td>
                <td>{{ item.reader_lastname }}</td>
                <td>{{ item.reader_birthday }}</td>
                <td>{{ item.reader_gender }}</td>
                <td>{{ item.reader_address }}</td>
                <td>{{ item.reader_phone }}</td>
                <td>{{ item.account_id.account_name }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                  <button
                    class="btn btn-primary btn-sm action"
                    @click="naivigateToEdit(item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm action"
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
import readerService from "@/services/reader.service";
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
        const response = await readerService.getAll();

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
        if (!result.isConfirmed) {
          return;
        }
        // Delete item
        await readerService.delete(item._id);
        this.fetchItems();
      } catch (error) {
        console.log(error);
      }
    },
    naivigateToEdit(item) {
      this.$router.push(`/reader-info/${item._id}`);
    },
  },
  computed: {
    itemStrings() {
      return this.items.map((item, index) => {
        const { reader_id, reader_firstname, reader_lastname, createdAt } =
          item;
        return [reader_id, reader_firstname, reader_lastname, createdAt].join(
          ""
        );
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
.action {
  width: 100px;
  margin-bottom: 3px;
}
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
