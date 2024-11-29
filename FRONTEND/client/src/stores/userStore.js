import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    account_role: null,
  }),
  actions: {
    login(account_role) {
      this.isAuthenticated = true;
      this.account_role = account_role;
    },
    logout() {
      this.isAuthenticated = false;
      this.account_role = null;
      localStorage.removeItem("token");
    },
  },
});
