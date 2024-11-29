<script>
import BorrowingDetailService from "@/services/borrowingDetail.service";
export default {
  data() {
    return {
      BorrowingList: [],
    };
  },
  methods: {
    async getBooks() {
      try {
        const response = await BorrowingDetailService.getAllReturnedDetails();
        if (response.status === "success") {
          this.BorrowingList = response.data;
        }
        console.log(this.BorrowingList);
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
    <div class="card-header header-color">Returned Information</div>
    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Borrowed Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Returned Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in BorrowingList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ detail.book.book_name }}</td>
            <td>{{ formatDate(detail.borrowed_date) }}</td>
            <td>{{ formatDate(detail.due_date) }}</td>
            <td>{{ formatDate(detail.returned_date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <p class="text-center mt-3 mb-3 text-muted fs-4 fw-bold">
      No returned books
    </p>
  </div>
</template>
