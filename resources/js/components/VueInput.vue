<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    class="input"
    @input="updateValue($event)"
    :class="classes"
  />
</template>

<script>
export default {
  props: ["type", "name", "placeholder", "value", "classes"],
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style scoped></style>
