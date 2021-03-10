<script>
import VDataTable from 'vuetify/lib/components/VDataTable/VDataTable';
export default {
  name: 'v-table',
  extends: VDataTable,
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemsPerPage: {
      type: Number,
      default: -1
    },
    hideDefaultFooter: {
      type: Boolean,
      default: true
    },
    noDataText: {
      type: String,
      default: 'Chưa có dữ liệu'
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    height: {
      type: Number,
      default: 600
    }
  }
};
</script>
