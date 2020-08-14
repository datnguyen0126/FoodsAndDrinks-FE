<template>
  <tr>
    <td>
      <div class="row">
        <div class="col-sm-2 hidden-xs">
          <img src alt="..." class="img-responsive" />
        </div>
        <div class="col-sm-10">
          <h4 class="nomargin">{{ item.food.name }}</h4>
          <p>{{ item.food.description }}</p>
        </div>
      </div>
    </td>
    <td>${{ item.price }}</td>
    <td>
      <input
        type="number"
        class="form-control-sm text-center"
        style="width:5em"
        v-bind:value="qvalue"
        v-on:input="sendChangeEvent"
      />
    </td>
    <td class="text-center">{{ (item.quantity * item.price).toFixed(2) }}</td>
    <td class="actions">
      <button class="btn btn-info btn-sm">
        <i class="fa fa-retweet" v-on:click="sendUpdateEvent"></i>
      </button>
      <button class="ml-2 btn btn-danger btn-sm">
        <i class="fa fa-trash" v-on:click="sendRemoveEvent"></i>
      </button>
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
  computed: {},
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
    sendUpdateEvent() {
      this.$emit("update", {
        food_id: this.item.food.id,
        quantity: this.qvalue,
      });
    },
  },
};
</script>

