<script>
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Swal from "sweetalert2";
import LibraryFooter from "@/components/LibraryFooter.vue";
export default {
  components: {
    LibraryFooter,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const isLoggedIn = computed(() => userStore.isAuthenticated);

    const handleProfileClick = async (event) => {
      if (!isLoggedIn.value) {
        event.preventDefault();
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to access this page.",
        });
      }
    };
    return {
      route,
      handleProfileClick,
    };
  },
};
</script>
<template>
  <header>
    <nav class="nav nav-pills nav-fill bg-light">
      <router-link
        class="nav-link rounded-0"
        :class="{ active: route.path === '/' }"
        aria-current="page"
        to="/"
      >
        <strong>Research documents</strong>
      </router-link>
      <router-link
        class="nav-link rounded-0"
        :class="{ active: route.path === '/profile' }"
        aria-current="page"
        to="/profile"
        @click="handleProfileClick"
      >
        <strong>Reader Information</strong>
      </router-link>
    </nav>
  </header>
  <main class="custom-height">
    <div class="container">
      <router-view />
    </div>
  </main>
  <footer>
    <LibraryFooter />
  </footer>
</template>
<style scoped>
.custom-height {
  min-height: 100vh;
}
</style>
