<script>
import BorrowingDetailService from "@/services/borrowingDetail.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      BorrowingList: [],
    };
  },
  methods: {
    async getBooks() {
      try {
        const response = await BorrowingDetailService.getAllBorrowedDetails();
        if (response.status === "success") {
          this.BorrowingList = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async renew(detail) {
      try {
        const response = await BorrowingDetailService.renew({
          _id: detail._id,
        });
        console.log(response);

        if (response.status === "success") {
          await Swal.fire({
            icon: "success",
            title: "Renewal Request Sent Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getBooks();
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (!date) return "Ngày không xác định";
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) return "Ngày không hợp lệ";
      return parsedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  created() {
    this.getBooks();
  },
};
</script>
<template>
  <div class="card" v-if="BorrowingList.length > 0">
    <div class="card-header header-color">Borrowed Information</div>
    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="px-4 py-2">#</th>
            <th scope="col" class="px-4 py-2">Title</th>
            <th scope="col" class="px-4 py-2">Borrowed Date</th>
            <th scope="col" class="px-4 py-2">Due Date</th>
            <th scope="col" class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in BorrowingList" :key="index">
            <th scope="row" class="px-4 py-2">{{ index + 1 }}</th>
            <td class="px-4 py-2">{{ detail.book.book_name }}</td>
            <td class="px-4 py-2">{{ formatDate(detail.borrowed_date) }}</td>
            <td class="px-4 py-2">{{ formatDate(detail.due_date) }}</td>
            <td class="px-4 py-2">
              <button
                class="btn btn-primary me-2 action-width"
                @click="renew(detail)"
              >
                <i class="fa-regular fa-calendar-plus"></i>
                Request renewal
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <p class="text-center mt-3 mb-3 text-muted fs-4 fw-bold">
      No borrowed books
    </p>
  </div>
</template>

<style scoped>
.action-width {
  width: 150px;
}
</style>
