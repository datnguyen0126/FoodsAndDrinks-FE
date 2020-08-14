<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-7">
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Email address</label>
              <input type="email" class="form-control" v-model="user.email" disabled />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">User name</label>
              <input type="text" class="form-control" v-model="user.name" disabled />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Phone number</label>
              <input type="tel" class="form-control" v-model="order.contact_number" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Address</label>
              <input type="text" class="form-control" v-model="order.address" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">City</label>
              <input type="text" class="form-control" v-model="order.city" />
            </div>
          </form>
        </div>
        <div class="col-sm-5">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">{{ items.length }}</span>
          </h4>
          <ul class="list-group mb-3">
            <div v-for="item in items" v-bind:key="item.food.id">
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">{{ item.food.name }}</h6>
                  <small class="text-muted">{{ item.food.description }}</small>
                </div>
                <span class="text-muted">{{ item.total_price }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Discount</h6>
                </div>
                <span class="text-success">-{{ (item.food.discount * item.total_price).toFixed(2) }}</span>
              </li>
            </div>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{{items.reduce((total, item) => total + (item.quantity * item.price * (1 - item.food.discount)), 0).toFixed(2)}}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/cart" class="btn btn-secondary m-1">Back</router-link>
      <router-link to="/orderlist" class="btn btn-primary m-1" v-on:click="this.submitOrder">Place Order</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Navbar from "./Navbar";
import { orderService } from "../_services/order.service"

export default {
  components: {
    Navbar,
  },
  data: function () {
    return {
      order: {
        user: "",
        address: "",
        contact_number: "",
        city: "",
      },
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.cart.items,
      user: (state) => state.account.user,
    }),
  },
  methods: {
    ...mapActions("cart", {
      getCart: "getCart",
    }),
    async submitOrder() {
      await orderService.createOrder(this.order);
      this.$router.push(`/orderlist`);
    },
  },
  created() {
    this.getCart();
  },
  mounted: function () {
    if (this.user) {
      this.order.user = this.user.id;
    }
  },
};
</script>