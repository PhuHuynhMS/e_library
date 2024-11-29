<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control me-2"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <button class="btn btn-outline-secondary" type="button" @click="submit">
      Search
    </button>
  </div>
</template>
