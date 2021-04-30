<template>
  <div>
    <kendo-scheduler
      :data-source="remoteDataSource"
      :editable-template="customEditorTemplate"
      :all-day-event-template="eventTemplate"
      :editable-resize="false"
      :editable-move="false"
      :footer="false"
      :event-template="eventTemplate"
      :height="450"
      @change="onChange"
      @edit="onEdit"
      @add="onAdd"
      @cancel="onCancel"
      @dataBound="onDataBound"
      @move="onMove"
      @navigate="onNavigate"
      @resize="onResize"
      @save="onSave"
    >
      <kendo-scheduler-view :selected="true" :type="'week'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
    </kendo-scheduler>
    <script id="eventTemplate" type="text/x-kendo-template">
      <h3 class="task_name">#: taskName #</h3>
        <span class="time">
          #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #
        </span>
        <b class="time">
          # if(isOff === true) { #
          Nghỉ có phép
          # } else if(isOff === false) { #
          Nghỉ không phép
          # } #
        </b>
    </script>

    <script id="customEditorTemplate" type="text/x-kendo-template">
      <div class="k-edit-label"><label for="taskName">Công việc</label></div>
      <div data-container-for="taskName" class="k-edit-field">
          <input id="taskDropdownlist" />
      </select>
        </div>
      <div class="k-edit-label">
          <label for="start">Thời gian bắt đầu</label>
        </div>
      <div data-container-for="start" class="k-edit-field">
          <input type="text"
                 data-role="datetimepicker"
                 data-interval="15"
                 data-type="date"
                 data-bind="value:start,invisible:isAllDay"
                 name="start"/>
          <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay" name="start" />
          <span data-for="start" class="k-invalid-msg" style="display: none;"></span>
        </div>
      <div class="k-edit-label"><label for="end">Thời gian kết thúc</label></div>
      <div data-container-for="end" class="k-edit-field">
          <input type="text" data-type="date" data-role="datetimepicker" data-bind="value:end,invisible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
          <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
          <span data-for="end" class="k-invalid-msg" style="display: none;"></span>
        </div>
      <div class="k-edit-label"><label for="isAllDay">Cả ngày</label></div>
      <div data-container-for="isAllDay" class="k-edit-field">
          <input type="checkbox" class="mt-8" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay">
        </div>
      <div class="k-edit-label"><label for="recurrenceRule">Lặp lại</label></div>
      <div data-container-for="recurrenceRule" class="k-edit-field">
          <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
      </div>
      <div class="k-edit-label"><label for="isOff">Hiện diện</label></div>
      <div data-container-for="isOff" class="k-edit-field">
        <input id="isOffDropdownlist" />
      </div>
      <div class="k-edit-label"><label for="price">Giá tiền</label></div>
      <div data-container-for="price" class="k-edit-field">
        <input id="txtPrice" type="number" data-bind="value:price" min="0" />
      </div>
      <div class="k-edit-label"><label for="notes">Ghi chú</label></div>
      <div data-container-for="notes" class="k-edit-field">
          <textarea name="notes" class="k-textbox" data-bind="value:notes"></textarea>
        </div>
    </script>
  </div>
</template>
<script>
import Vue from 'vue';
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/messages/kendo.messages.vi-VN.js';
import '@progress/kendo-ui/js/cultures/kendo.culture.vi-VN.min.js';
import '@progress/kendo-ui/js/kendo.timezones.min.js';
import '@progress/kendo-theme-default/dist/all.css';
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper';
import { Scheduler, SchedulerView } from '@progress/kendo-scheduler-vue-wrapper';
import taskService from '@/services/taskService';
Vue.use(SchedulerInstaller);

export default {
  props: ['userId'],
  components: {
    'kendo-scheduler': Scheduler,
    'kendo-scheduler-view': SchedulerView
  },
  data: function() {
    return {
      remoteDataSource: new window.kendo.data.SchedulerDataSource({
        transport: {
          read: {
            url: `/api/v2/appointments/${this.userId}`,
            dataType: 'json',
            contentType: 'application/json'
          },
          update: {
            url: '/api/v2/appointments',
            dataType: 'json',
            contentType: 'application/json',
            type: 'PUT'
          },
          create: {
            url: '/api/v2/appointments',
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
          },
          destroy: {
            url: '/api/v2/appointments',
            dataType: 'json',
            contentType: 'application/json',
            type: 'DELETE'
          },

          parameterMap: function(options, operation) {
            if (operation !== 'read') {
              window.currentOperation = operation;
              let model = JSON.parse(window.kendo.stringify(options));
              console.log('parameterMap', model);
              return JSON.stringify(model);
            }
          }
        },
        schema: {
          model: {
            id: 'id',
            fields: {
              id: { default: window.kendo.guid() },
              taskId: { from: 'task_id', validation: { required: true } },
              taskName: { from: 'task_name', validation: { required: true } },
              userId: { from: 'user_id', defaultValue: this.userId },
              start: { type: 'date', from: 'start' },
              end: { type: 'date', from: 'end' },
              startTimezone: { defaultValue: 'Etc/GMT-7', from: 'start_timezone' },
              price: { type: 'number', from: 'price' },
              notes: { from: 'notes' },
              recurrenceId: { from: 'recurrence_id' },
              recurrenceRule: { from: 'recurrence_rule' },
              recurrenceException: { from: 'recurrence_exception' },
              isAllDay: { type: 'boolean', from: 'is_all_day' },
              isOff: { type: 'boolean', from: 'is_off', defaultValue: null }
            }
          }
        }
      })
    };
  },
  methods: {
    customEditorTemplate: function(e) {
      var template = window.kendo.template(window.kendo.jQuery('#customEditorTemplate').html());
      return template(e);
    },
    eventTemplate: function(e) {
      var template = window.kendo.template(window.kendo.jQuery('#eventTemplate').html());
      return template(e);
    },
    onChange: function(ev) {
      console.log('Event :: change', ev);
    },
    bindTaskDropDownList: async e => {
      let tasks = [];
      await taskService.getAll().then(response => {
        tasks = response.data;
      });
      let ddlContainer = e.container.find('#taskDropdownlist');
      let priceTextBox = e.container.find('#txtPrice').data('kendoNumericTextBox');
      let eventItem = e.event;
      let selectedId = eventItem.taskId;
      ddlContainer.kendoDropDownList({
        dataSource: {
          data: tasks
        },
        select: function(e) {
          eventItem.taskId = e.dataItem.id;
          eventItem.taskName = e.dataItem.name;
          eventItem.price = e.dataItem.price;
          priceTextBox.value(e.dataItem.price);
          eventItem.dirty = true;
        },
        filter: 'contains',
        dataTextField: 'name',
        dataValueField: 'id',
        dataBound: function(e) {
          let item = {};
          if (!selectedId) {
            this.select(0);
            item = e.sender.dataItem(0);
            eventItem.price = item.price;
            priceTextBox.value(item.price);
          } else {
            let dataItem = e.sender.dataSource.data().find(x => x.id === selectedId);
            let index = e.sender.dataSource.data().indexOf(dataItem);
            this.select(index);
            item = dataItem;
          }
          eventItem.taskId = item.id;
          eventItem.taskName = item.name;
        }
      });
    },
    bindIsOffDropdownList(e) {
      let ddlContainer = e.container.find('#isOffDropdownlist');
      let eventItem = e.event;
      let selectedValue = eventItem.isOff;
      ddlContainer.kendoDropDownList({
        dataSource: {
          data: [
            { value: null, text: 'Có mặt' },
            { value: true, text: 'Nghỉ có phép' },
            { value: false, text: 'Nghỉ không phép' }
          ]
        },
        select: function(e) {
          eventItem.isOff = e.dataItem.value;
          eventItem.dirty = true;
        },
        dataTextField: 'text',
        dataValueField: 'value',
        dataBound: function(e) {
          if (selectedValue === null) {
            this.select(0);
            eventItem.isOff = e.sender.dataItem(0).value;
          } else {
            let dataItem = e.sender.dataSource.data().find(x => x.value === selectedValue);
            let index = e.sender.dataSource.data().indexOf(dataItem);
            this.select(index);
            eventItem.isOff = dataItem.value;
          }
        }
      });
    },
    bindPrice(e) {
      let priceTextBox = e.container.find('#txtPrice');
      priceTextBox.kendoNumericTextBox({
        format: 'c0',
        step: 1000
      });
    },
    onEdit: function(e) {
      console.log('Event :: edit', e);
      let that = this;
      that.bindTaskDropDownList(e);
      that.bindIsOffDropdownList(e);
      that.bindPrice(e);
    },
    onAdd: function(ev) {
      console.log('Event :: add', ev);
    },
    onCancel: function(ev) {
      console.log('Event :: cancel', ev);
    },
    onDataBound: function(ev) {
      console.log('Event :: dataBound', ev);
    },
    onMove: function(ev) {
      console.log('Event :: move', ev);
    },
    onNavigate: function(ev) {
      console.log('Event :: navigate', ev);
    },
    onResize: function(ev) {
      console.log('Event :: resize', ev);
    },
    onSave: function(ev) {
      console.log('Event :: save', ev);
    },
    remoteDataSourceSyncEvent() {
      if (window.currentOperation == 'create') {
        Vue.$toast.success('Thêm thành công');
      } else if (window.currentOperation == 'update') {
        Vue.$toast.success('Cập nhật thành công');
      } else {
        Vue.$toast.success('Xoá thành công');
      }
      this.remoteDataSource.read();
    }
  },
  created() {
    window.kendo.culture('vi-VN');
    this.remoteDataSource.bind('sync', this.remoteDataSourceSyncEvent);
  }
};
</script>
<style lang="css">
.k-scheduler-edit-form .k-edit-label {
  width: 20%;
}
.k-textbox[name='notes'] {
  padding-left: 8px;
}
.mt-8 {
  margin-top: 8px;
}
input[type='radio'] {
  vertical-align: middle;
}
.time {
  display: block;
  width: 100%;
  margin-left: 8px;
}
.task_name {
  margin-left: 8px;
}
</style>
