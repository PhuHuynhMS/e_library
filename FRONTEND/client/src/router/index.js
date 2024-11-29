import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { jwtDecode } from "jwt-decode";

import UserHome from "@/views/UserHome.vue";
import BookDetail from "@/views/BookDetail.vue";
import UserInfo from "@/views/UserInfo.vue";
import StaffDashBoard from "@/views/StaffDashBoard.vue";
import EditBorrowingDetails from "@/views/EditBorrowingDetails.vue";
import StaffBookDashBoard from "@/views/StaffBookDashBoard.vue";
import EditBook from "@/views/EditBook.vue";
import AddBook from "@/views/AddBook.vue";
import StaffPublisherDashBoard from "@/views/StaffPublisherDashBoard.vue";
import AddPublisher from "@/views/AddPublisher.vue";
import PublisherForm from "@/components/PublisherForm.vue";
import EditPublisher from "@/views/EditPublisher.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/UserLayout.vue"),
    meta: {
      role: "reader",
    },
    children: [
      {
        path: "",
        name: "Home",
        component: UserHome,
      },
      {
        path: "/books/:id",
        name: "BookDetail",
        component: BookDetail,
        props: true,
      },
      {
        path: "/profile",
        name: "Profile",
        component: UserInfo,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/staff",
    component: () => import("@/layouts/StaffLayout.vue"),
    meta: {
      requiresAuth: true,
      role: "staff",
    },
    children: [
      {
        path: "",
        name: "StaffDashBoard",
        component: StaffDashBoard,
      },
      {
        path: "/edit/:id",
        name: "EditBorrowingDetails",
        component: EditBorrowingDetails,
      },
      {
        path: "/books",
        name: "BookList",
        component: StaffBookDashBoard,
      },
      {
        path: "/books/:id",
        name: "EditBook",
        component: EditBook,
      },
      {
        path: "/add",
        name: "AddBook",
        component: AddBook,
      },
      {
        path: "/publishers",
        name: "PublisherList",
        component: StaffPublisherDashBoard,
      },
      {
        path: "/add/publisher",
        name: "AddPublisher",
        component: AddPublisher,
      },
      {
        path: "/edit/publisher/:id",
        name: "EditPublisher",
        component: EditPublisher,
      },
    ],
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

    if (decoded.exp * 1000 < Date.now()) {
      userStore.logout();
    }

    userStore.login(account_role);
  }

  const isAuthenticated = userStore.isAuthenticated;
  const account_role = userStore.account_role;

  if (account_role !== "staff") {
    if (to.name === "Home") {
      return next();
    }

    if (to.name === "BookDetail") {
      return next();
    }
  }

  if (to.meta.role && to.meta.role !== account_role) {
    if (account_role === "staff") {
      return next({ name: "StaffDashBoard" });
    }
    return next({ name: "Home" });
  }
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "Home" });
  } else {
    return next();
  }
});

export default router;
