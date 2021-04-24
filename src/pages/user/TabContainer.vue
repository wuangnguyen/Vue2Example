<template>
  <div>
    <v-tabs v-model="tab" vertical>
      <v-tab v-for="item in items" :key="item.title">
        {{ item.title }}
      </v-tab>
      <v-tab-item v-for="item in items" :key="item.title">
        <component :is="item.component" :userId="userId"></component>
      </v-tab-item>
    </v-tabs>
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
          title: 'Phân công',
          component: () => import('@/pages/scheduler/Scheduler')
        },
        {
          title: 'Tiền công',
          component: () => import('@/pages/salary/Salary')
        },
        {
          title: 'Khen T/KL',
          component: () => import('@/pages/reward/Reward')
        }
      ]
    };
  }
};
</script>
