<script lang="ts" setup>
const { label, type, width, disabled } = defineProps<{
  label?: string;
  type?: string;
  width?: string;
  disabled?: boolean;
}>();
const modelValue = defineModel();
</script>

<template>
  <div class="container">
    <input
      v-model="modelValue"
      :disabled="disabled || false"
      :type="type || 'text'"
      autocomplete="off"
      class="input"
      name="text"
      required
    />
    <label class="label">{{ label || "Input" }}</label>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  color: white;
}

.container .label {
  font-size: 17px;
  padding-left: 10px;
  position: absolute;
  top: -35px;
  left: -10px;
  transition: 0.3s;
  pointer-events: none;
}

.input {
  width: v-bind("width || '300px'");
  height: 45px;
  border: none;
  outline: none;
  padding: 0 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  background-color: transparent;
  transition: 0.3s;
  box-shadow:
    3px 3px 10px rgba(0, 0, 0, 1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
}

.input:disabled {
  background-color: rgba(107, 100, 100, 0.4);
  box-shadow: 0 0 10px rgba(107, 100, 100, 0.4);
  color: #a2a2a2;
}
</style>
