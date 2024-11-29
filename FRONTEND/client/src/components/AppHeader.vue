<script>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import AccountService from "@/services/account.service";
import { useRouter, useRoute } from "vue-router";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    const user = ref({
      username: "",
      password: "",
    });

    const registerUser = ref({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      phoneNumber: "",
      username: "",
      password: "",
    });

    const isLogin = ref(false);
    const isRegister = ref(false);
    const userStore = useUserStore();
    const isLoggedIn = computed(() => userStore.isAuthenticated);

    const onLogout = () => {
      userStore.logout();
      window.location.reload();
    };

    const onLogin = async () => {
      const userStore = useUserStore();
      const router = useRouter();
      try {
        const response = await AccountService.login(user.value);

        if (response.data.status == "success") {
          localStorage.setItem("token", response.data.data.token);
          const decoded = jwtDecode(response.data.data.token);
          userStore.login(decoded.tokenPayload.account_role);
          window.location.reload();

          if (userStore.account_role == "staff") {
            router.push({ name: "StaffDashBoard" });
          } else router.push({ name: "Home" });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }
      }
    };

    const onRegister = async () => {
      const userStore = useUserStore();
      const router = useRouter();
      try {
        const response = await AccountService.register(registerUser.value);

        if (response.data.status == "success") {
          localStorage.setItem("token", response.data.data.token);
          userStore.login();
          window.location.reload();

          router.push({ name: "Home" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const closeModal = () => {
      if (isLogin.value) {
        isLogin.value = false;
      }
      if (isRegister.value) {
        isRegister.value = false;
      }
    };
    const route = useRoute();

    return {
      route,
      isLoggedIn,
      registerUser,
      user,
      onLogin,
      onLogout,
      onRegister,
      isLogin,
      isRegister,
      closeModal,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <a href="/" class="navbar-brand"
        >Book Borrowing Management Application
        <span><i class="fas fa-book text-white"></i></span>
      </a>
      <div v-if="!isLoggedIn">
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="
              isRegister = true;
              isLogin = false;
            "
          >
            Register
          </button>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="
              isLogin = true;
              isRegister = false;
            "
          >
            Login
          </button>
        </li>
      </div>
      <div v-else>
        <button type="button" class="btn btn-danger" @click="onLogout">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <Teleport to="#modal">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @click.self="closeModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel" v-if="isLogin">
              Login
            </h1>
            <h1
              class="modal-title fs-5"
              id="exampleModalLabel"
              v-if="isRegister"
            >
              Register
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="isLogin">
            <LoginForm :user="user" @submit:user="onLogin" />
          </div>
          <div class="modal-body" v-if="isRegister">
            <RegisterForm @submit:user="onRegister" :user="registerUser" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
