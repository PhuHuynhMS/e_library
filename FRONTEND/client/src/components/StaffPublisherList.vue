<script>
export default {
  props: {
    publishers: { type: Array, default: [] },
  },
  methods: {
    deletePublisher(publisher_id) {
      this.$emit("delete", publisher_id);
    },

    navigateToEditPage(publisher) {
      this.$router.push({
        name: "EditPublisher",
        params: { id: publisher._id },
      });
    },
  },
};
</script>
<template>
  <table class="table-auto border-collapse border">
    <thead>
      <tr>
        <th class="border px-4 py-2">Publisher ID</th>
        <th class="border px-4 py-2">Publisher Name</th>
        <th class="border px-4 py-2">Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="publisher in publishers" :key="publisher._id">
        <td class="border px-4 py-2">{{ publisher._id }}</td>
        <td class="border px-4 py-2">{{ publisher.publisher_name }}</td>
        <td class="border px-4 py-2">{{ publisher.publisher_address }}</td>

        <td class="border px-4 py-2 d-flex flex-column">
          <button
            class="btn btn-warning text-white mb-2 fixed-width"
            @click="navigateToEditPage(publisher)"
          >
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button
            class="btn btn-danger fixed-width"
            @click="deletePublisher(publisher._id)"
          >
            <i class="fas fa-trash"></i>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.fixed-width {
  width: 100px;
}
</style>
