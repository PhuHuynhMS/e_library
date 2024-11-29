import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { jwtDecode } from "jwt-decode";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Account",
        component: () => import("../views/Account.vue"),
        default: true,
      },
      {
        path: "/reader-info",
        name: "ReaderInfo",
        children: [
          {
            path: "",
            name: "ReaderInfo",
            component: () => import("../views/ReaderInfo.vue"),
            default: true,
          },
          {
            path: ":id",
            name: "EditReaderInfo",
            component: () => import("../views/EditReaderInfo.vue"),
          },
        ],
      },
      {
        path: "/staff-info",
        name: "StaffInfo",
        children: [
          {
            path: "",
            name: "StaffInfo",
            component: () => import("../views/StaffInfo.vue"),
            default: true,
          },
          {
            path: ":id",
            name: "EditStaffInfo",
            component: () => import("../views/EditStaffInfo.vue"),
          },
          {
            path: "add",
            name: "AddStaff",
            component: () => import("../views/AddStaff.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  const userStore = useUserStore();

  if (token) {
    const decoded = jwtDecode(token);
    const account_role = decoded.tokenPayload.account_role;

    if (decoded.exp * 1000 < Date.now() && account_role !== "admin") {
      userStore.logout();
    }

    userStore.login(account_role);
  }

  const isAuthenticated = userStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "Auth" });
  } else {
    return next();
  }
});

export default router;
