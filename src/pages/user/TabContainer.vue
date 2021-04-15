<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.title">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.title">
        <div class="mt-2">
          <component :is="item.component" :userId="userId"></component>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  props: ['userId'],
  data() {
    return {
      tab: null,
      items: [
        {
          title: 'Khen thưởng/Kỷ luật',
          component: () => import('@/pages/reward/Reward')
        },
        {
          title: 'Phân công công việc',
          component: () => import('./Schedule')
        }
      ]
    };
  }
};
</script>
