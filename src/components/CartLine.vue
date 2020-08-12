<template>
  <tr>
    <td>{{ food.name }}</td>
    <td>
      <input
        type="number"
        class="form-control-sm"
        style="width:5em"
        v-bind:value="qvalue"
        v-on:input="sendChangeEvent"
      />
    </td>
    <td class="text-right">{{ item.price }}</td>
    <td class="text-right">{{ (item.quantity * item.price) }}</td>
    <td class="text-center">
      <button class="btn btn-sm btn-danger" v-on:click="sendRemoveEvent">Remove</button>
    </td>
  </tr>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["item"],
  data: function () {
    return {
      qvalue: this.item.quantity,
      food1: {}
    };
  },
  computed: {
    ...mapState({
      food: (state) => state.foods.all.food
    }),
  },
  methods: {
    ...mapActions("foods", {
      getDetail: "getDetail",
    }),
    sendChangeEvent($event) {
      if ($event.target.value > 0) {
        this.$emit("quantity", Number($event.target.value));
        this.qvalue = $event.target.value;
      } else {
        this.$emit("quantity", 1);
        this.qvalue = 1;
        $event.target.value = this.qvalue;
      }
    },
    sendRemoveEvent() {
      this.$emit("remove", this.line);
    },
  },
  created() {
    this.getDetail({ id: this.item.food_id });
  },
  mounted(){
    //this.food1 = 
  }
};
</script>