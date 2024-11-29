<template>
  <div class="custom-height">
    <header>
      <nav class="nav nav-pills nav-fill bg-light">
        <router-link
          to="/staff"
          class="nav-link rounded-0"
          :class="{ active: route.path === '/staff' }"
          aria-current="page"
          >Dashboard</router-link
        >
        <router-link
          to="/books"
          class="nav-link rounded-0"
          :class="{ active: route.path === '/books' }"
          aria-current="page"
          >Book List</router-link
        >
        <router-link
          to="/publishers"
          class="nav-link rounded-0"
          :class="{ active: route.path === '/publishers' }"
          aria-current="page"
          >Publisher List</router-link
        >
      </nav>
    </header>
    <main>
      <div class="container mb-3 h-100">
        <router-view />
      </div>
    </main>
  </div>
  <footer>
    <LibraryFooter />
  </footer>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import LibraryFooter from "@/components/LibraryFooter.vue";

export default {
  components: {
    LibraryFooter,
  },
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const logout = () => {
      userStore.logout();
      window.location.reload(); // Reload để reset token
    };

    return { logout, route };
  },
};
</script>

<style scoped>
.custom-height {
  min-height: 100vh;
}
</style>
