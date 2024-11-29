<script>
import AccountService from "@/services/account.service";
import MenuSidebar from "@/components/MenuSidebar.vue";
import RenewalCard from "@/components/RenewalCard.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import ReturnedCard from "@/components/ReturnedCard.vue";
import BorrowedCard from "@/components/BorrowedCard.vue";
import ChangePasswordCard from "@/components/ChangePasswordCard.vue";
import Swal from "sweetalert2";
export default {
  components: {
    MenuSidebar,
    UserInfoCard,
    RenewalCard,
    ReturnedCard,
    BorrowedCard,
    ChangePasswordCard,
  },
  data() {
    return {
      activeIndex: 0,
      isChanged: false,
    };
  },

  watch: {
    activeIndex(newValue, oldValue) {
      if (newValue !== 4) {
        this.isChanged = false; // Reset trạng thái khi rời khỏi ChangePasswordCard
      }
    },
  },

  methods: {
    async handleChangePassword(password) {
      try {
        const response = await AccountService.changePassword(password);

        if (response.data.status == "success") {
          await Swal.fire({
            icon: "success",
            title: "Password Changed Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<template>
  <h1 class="text-center mt-3 fs-4 fw-bold text-uppercase text-light">
    User Information
  </h1>
  <div class="wrapper">
    <div class="page">
      <div class="row">
        <div class="col-md-3">
          <MenuSidebar v-model:active-index="activeIndex" />
        </div>
        <div class="col-md">
          <BorrowedCard v-if="activeIndex === 0" />
          <RenewalCard v-if="activeIndex === 1" />
          <ReturnedCard v-if="activeIndex === 2" />
          <UserInfoCard v-if="activeIndex === 3" />
          <ChangePasswordCard
            v-if="activeIndex === 4"
            @change-password="handleChangePassword"
            :isChanged="isChanged"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.page {
  text-align: left;
  max-width: 100vw;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
