<template>
  <v-dialog persistent v-model="isDisplay" :max-width="maxWidth">
    <v-card>
      <v-card-title>
        <span class="headline"><slot name="title"/></span>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="footer"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isDisplay: Boolean,
    maxWidth: {
      type: String,
      default: '800px'
    }
  }
};
</script>
