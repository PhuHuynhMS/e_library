<script>
import Swal from "sweetalert2";
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";

export default {
  data() {
    return {
      publisher: {
        publisher_name: "",
        publisher_address: "",
      },
    };
  },
  components: {
    PublisherForm,
  },
  methods: {
    async submit(publisher) {
      try {
        const response = await PublisherService.create(publisher);
        if (response.status == "success") {
          await Swal.fire({
            icon: "success",
            title: "Publisher Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({ name: "PublisherList" });
        }
      } catch (error) {
        console.log(error);

        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="page mt-3">
      <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4 text-center">
          Add Publisher Details
        </h1>
        <!-- Form Section -->
        <PublisherForm @submit:publisher="submit" :publisher="publisher" />
      </div>
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
</style>
