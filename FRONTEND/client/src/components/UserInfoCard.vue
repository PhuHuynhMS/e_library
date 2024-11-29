<script>
import ReaderService from "@/services/reader.service";
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async retrieveData() {
      const response = await ReaderService.getMe();
      console.log(response);
      this.user = response.data.data;
    },

    formatDate() {
      const date = new Date(this.user.createdAt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth()).padStart(2, "0");
      const year = String(date.getFullYear());
      return day + "/" + month + "/" + year;
    },
  },
  created() {
    this.retrieveData();
  },
};
</script>
<template>
  <div class="card">
    <div class="card-header header-color">General Information</div>
    <div class="card-body">
      <h5 class="card-title">
        {{ user.reader_firstname + " " + user.reader_lastname }}
      </h5>
      <p class="card-text"><strong>Identifier</strong>: {{ user.reader_id }}</p>
      <p class="card-text"><strong>Created At</strong>: {{ formatDate() }}</p>
      <p class="card-text"><strong>Gender</strong>: {{ user.reader_gender }}</p>
      <p class="card-text">
        <strong>Address</strong>:
        {{ user.reader_address }}
      </p>
      <p class="card-text">
        <strong>Phone Number</strong>:
        {{ user.reader_phone }}
      </p>
    </div>
  </div>
</template>
<style>
.header-color {
  background-color: #fcf8e3;
}
</style>
