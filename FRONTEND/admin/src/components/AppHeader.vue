<template>
  <header class="header bg-dark text-white py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <h1 class="m-0">Admin Dashboard</h1>
      <nav>
        <ul class="nav">
          <li class="nav-item">
            <button
              @click="onLogout"
              v-if="isAuthenticated"
              class="nav-link text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  name: "Header",

  methods: {
    onLogout() {
      const userStore = useUserStore();
      userStore.logout();
      window.location.reload();
    },
  },
  computed: {
    isAuthenticated() {
      const userStore = useUserStore();
      return userStore.isAuthenticated;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #343a40;
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: #ccc;
}
</style>
