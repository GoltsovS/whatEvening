<template lang="pug">
  input.form-control(
    :id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
  )
</template>

<script>
export default {
  props: {
    id: String,
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>
