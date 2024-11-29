<script>
import BookBorrowingForm from "@/components/BookBorrowingForm.vue";
import StaffBorrowedDocumentList from "@/components/StaffBorrowedDocumentList.vue";
import StaffMenuSideBar from "@/components/StaffMenuSideBar.vue";
import StaffRenewalRequest from "@/components/StaffRenewalRequest.vue";
import StaffReturnedDetails from "@/components/StaffReturnedDetails.vue";
import BorrowingDetailService from "@/services/borrowingDetail.service";
import StaffInfoCard from "@/components/StaffInfoCard.vue";
import ChangePasswordCard from "@/components/ChangePasswordCard.vue";
import StaffService from "@/services/staff.service";
import AccountService from "@/services/account.service";
import Swal from "sweetalert2";
export default {
  data() {
    
    return {
    
      returnedList: [],
      borrowedList: [],
      renewalRequests: [],
      error_message: null,
      activeIndex: 0,
      isChanged: false,
      count: {
        returnedList: 0,
        borrowedList: 0,
        renewalRequests: 0,
      },
    };
  },
  components: {
    StaffBorrowedDocumentList,
    BookBorrowingForm,
    StaffMenuSideBar,
    StaffReturnedDetails,
    StaffRenewalRequest,
    StaffInfoCard,
    ChangePasswordCard,
  },
  methods: {
    async getAllBorrowedDetails() {
      try {
        const response = await BorrowingDetailService.getAllBorrowedDetails();
        this.borrowedList = response.data;
        this.count.borrowedList = this.borrowedList.length;
      } catch (error) {}
    },

    async getAllReturnedDetails() {
      try {
        const response = await BorrowingDetailService.getAllReturnedDetails();
        this.returnedList = response.data;
        this.count.returnedList = this.returnedList.length;
      } catch (error) {
        console.log(error);
      }
    },

    async getAllRenewalRequests() {
      try {
        const response = await BorrowingDetailService.getAllRenewalRequests();
        this.renewalRequests = response.data;
        this.count.renewalRequests = this.renewalRequests.length;
      } catch (error) {
        console.log(error);
      }
    },

    async submitDetails(details) {
      try {
        this.error_message = null;
        const response = await BorrowingDetailService.create(details);

        if (response.status == "success") {
          await Swal.fire({
            title: "Success!",
            text: "Submit request successfully!",
            icon: "success",
            timer: 1500,
          });
        }
        this.closeModal();
        this.refreshList();
      } catch (error) {
        console.log(error);
        if (error.status == 404) {
          this.error_message = error.response.data.message;
        }
      }
    },

    async renewDetails(details) {
      try {
        const response = await BorrowingDetailService.renew(details);
        if (response.status === "success") {
          await Swal.fire({
            title: "Success!",
            text: "Accept request successfully!",
            icon: "success",
            timer: 1500,
          });
          this.refreshList();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async rejectDetails(details) {
      try {
        const response = await BorrowingDetailService.reject(details);

        if (response.status === "success") {
          await Swal.fire({
            title: "Success!",
            text: "Reject request successfully!",
            icon: "success",
            timer: 1500,
          });
          this.refreshList();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDetail(detail) {
      try {
        await BorrowingDetailService.delete(detail._id);
        this.refreshList();
      } catch (error) {
        console.log(error);
      }
    },

    async getMe() {
      try {
        const response = await StaffService.getMe();
        this.staff = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

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
          this.isChanged = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    closeModal() {
      document.getElementById("close").click();
    },

    refreshList() {
      this.getAllBorrowedDetails();
      this.getAllReturnedDetails();
      this.getAllRenewalRequests();
      this.getMe();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="page mt-3">
      <button
        type="button"
        class="btn btn-primary float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        v-if="activeIndex === 0"
      >
        <i class="fas fa-plus"></i>
        Add
      </button>
      <div class="row">
        <div class="col-md-3 mt-2">
          <StaffMenuSideBar v-model:active-index="activeIndex" :count="count" />
        </div>
        <div class="col-md">
          <StaffBorrowedDocumentList
            :details="borrowedList"
            @delete="deleteDetail"
            v-if="activeIndex === 0"
          />
          <StaffRenewalRequest
            :details="renewalRequests"
            v-if="activeIndex === 1"
            @renew="renewDetails"
            @reject="rejectDetails"
          />
          <StaffReturnedDetails
            :details="returnedList"
            v-if="activeIndex === 2"
            @delete="deleteDetail"
          />
          <StaffInfoCard :staff="staff" v-if="activeIndex === 3" />
          <ChangePasswordCard
            v-if="activeIndex === 4"
            @change-password="handleChangePassword"
            :isChanged="isChanged"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Teleport to="#modal">
    <div
      class="modal fade"
      id="exampleModal1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel1"
      aria-hidden="true"
      ref="borrowModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel1">
              Book Borrowing Form
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="error_message">
              {{ error_message }}
            </div>
            <BookBorrowingForm @submit="submitDetails" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
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
</style>
