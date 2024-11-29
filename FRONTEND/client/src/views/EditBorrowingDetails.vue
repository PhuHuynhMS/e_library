<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import BorrowingDetailService from "@/services/borrowingDetail.service";
import BorrowingDetailsForm from "@/components/BorrowingDetailsForm.vue";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    BorrowingDetailsForm,
  },
  data() {
    return {
      borrowing_details: {},
    };
  },

  methods: {
    async fetchBorrowingDetails() {
      try {
        const response = await BorrowingDetailService.getById(
          this.$route.params.id
        );
        this.borrowing_details = response.data;
        console.log(this.borrowing_details);
      } catch (error) {
        console.log(error);
      }
    },

    async updateBorrowingDetails(details) {
      try {
        const response = await BorrowingDetailService.update(
          this.$route.params.id,
          details
        );

        if (response.status == "success") {
          this.$router.push({ name: "StaffDashBoard" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.fetchBorrowingDetails();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="page mt-3">
      <BorrowingDetailsForm
        :borrowing_details="borrowing_details"
        @submit:detail="updateBorrowingDetails"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  text-align: left;
  max-width: 100vw;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.container {
  max-width: 800px;
}
.form-input,
.form-select {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
}

.error-feedback {
  color: red;
}
</style>
