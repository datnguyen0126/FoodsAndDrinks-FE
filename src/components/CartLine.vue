<template>
  <tr>
    <td>{{ item.food.name }}</td>
    <td>
      <input
        type="number"
        class="form-control-sm"
        style="width:5em"
        v-bind:value="qvalue"
        v-on:input="sendChangeEvent"
      />
      <input type="button" value="Update" v-on:click="sendUpdateEvent"/>
    </td>
    <td class="text-right">{{ item.price }}</td>
    <td class="text-right">{{ (item.quantity * item.price) }}</td>
    <td class="text-center">
      <button class="btn btn-sm btn-danger" v-on:click="sendRemoveEvent">Remove</button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["item"],
  data: function () {
    return {
      qvalue: this.item.quantity,
    };
  },
  computed: {

  },
  methods: {
    ...mapActions("foods", {
      getDetail: "getDetail",
    }),
    sendChangeEvent($event) {
      if ($event.target.value > 0) {
        this.qvalue = $event.target.value;
      } else {
        this.qvalue = 1;
        $event.target.value = this.qvalue;
      }
    },
    sendRemoveEvent() {
      this.$emit("delete", this.item);
    },
    sendUpdateEvent(){
      this.$emit("update", { food_id: this.item.food.id, quantity: this.qvalue })
    }
  },
};
</script>