<script lang="ts" setup>
const { label, type, width } = defineProps<{
  label?: string;
  type?: string;
  width?: string;
}>();
const modelValue = defineModel();
</script>

<template>
  <div class="input_container">
    <input
      v-model="modelValue"
      :type="type || 'text'"
      class="input"
      name="text"
      required
    />
    <label class="label">{{ label || "Input" }}</label>
  </div>
</template>

<style lang="scss" scoped>
.input_container {
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  color: white;
}

.input_container .label {
  font-size: 15px;
  padding-left: 10px;
  position: absolute;
  top: 13px;
  transition: 0.3s;
  pointer-events: none;
}

.input {
  width: v-bind("width || '200px'");
  height: 45px;
  border: none;
  outline: none;
  padding: 0 7px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  background-color: transparent;
  transition: 0.3s;
  box-shadow:
    3px 3px 10px rgba(0, 0, 0, 1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
}

.input:focus {
  color: #fff;
  box-shadow:
    3px 3px 5px rgba(0, 0, 0, 1),
    -1px -1px 3px rgba(255, 255, 255, 0.4);
}

.input_container .input:valid ~ .label,
.input_container .input:focus ~ .label {
  transition: 0.3s;
  padding-left: 2px;
  transform: translateY(-35px);
}

.input_container .input:valid,
.input_container .input:focus {
  box-shadow:
    3px 3px 5px rgba(0, 0, 0, 1),
    -1px -1px 3px rgba(255, 255, 255, 0.4);
}
</style>
