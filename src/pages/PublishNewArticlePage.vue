<script lang="ts" setup>
import { ref } from "vue";
import "vuetify/styles";
import { VuetifyTiptap, VuetifyViewer } from "vuetify-pro-tiptap";
import Header from "@/components/LayoutComp/Header.vue";

const content = ref("");

const publishEvent = () => {
  console.log(content.value);
};
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <VApp id="app" theme="dark">
    <VContainer>
      <VuetifyTiptap
        v-model="content"
        :max-height="465"
        :max-width="900"
        :min-height="200"
        label="文章编辑器"
        markdown-theme="github"
        rounded
      />
      <v-container>
        <v-row>
          <v-col cols="11"></v-col>
          <v-col cols="1"
            ><v-btn
              min-width="100%"
              theme="dark"
              variant="tonal"
              @click="publishEvent"
              >发表</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
      <v-divider style="margin: 1rem 0"></v-divider>
      <VuetifyViewer :value="content" markdown-theme="github" />
    </VContainer>
  </VApp>
</template>

<style lang="scss" scoped>
.v-theme--dark {
  --v-theme-background: 0, 0, 0, 0;
}
</style>
