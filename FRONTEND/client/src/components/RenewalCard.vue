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
        const response = await BorrowingDetailService.getAllRenewalDetails();
        if (response.status === "success") {
          this.BorrowingList = response.data;
        }
        console.log(this.BorrowingList);
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth()).padStart(2, "0");
      const year = String(date.getFullYear());
      return day + "/" + month + "/" + year;
    },
  },
  created() {
    this.getBooks();
  },
};
</script>
<template>
  <div class="card" v-if="BorrowingList.length > 0">
    <div class="card-header header-color">Renewal Information</div>
    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Date of renewal request</th>
            <th scope="col">Borrowed Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in BorrowingList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ detail.book.book_name }}</td>
            <td>{{ formatDate(detail.renewal_request_date) }}</td>
            <td>{{ formatDate(detail.borrowed_date) }}</td>
            <td>{{ formatDate(detail.due_date) }}</td>
            <td>{{ detail.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <p class="text-center mt-3 mb-3 text-muted fs-4 fw-bold">
      No renewal books
    </p>
  </div>
</template>
