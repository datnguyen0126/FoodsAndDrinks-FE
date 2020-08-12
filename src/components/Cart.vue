<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col mt-2">
          <h2 class="text-center">Your Cart</h2>
          <table class="table table-bordered table-striped p-2">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th class="text-right">Price</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="items.length == 0">
                <td colspan="4" class="text-center">Your cart is empty</td>
              </tr>
              <cart-line
                v-for="item in items"
                v-bind:key="item.food_id"
                v-bind:item="item"
                v-on:quantity="handleQuantityChange(item, $event)"
                v-on:update="updateCart"
                v-on:delete="deleteCart({food_id:item.food.id})"
              />
            </tbody>
            <tfoot v-if="items.length > 0">
              <tr>
                <td colspan="3" class="text-right">Total:</td>
                <td class="text-right">{{ items.reduce((total, item) => total + (item.quantity * item.price), 0) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-center">
            <router-link to="/" class="btn btn-secondary m-1">Back to shop</router-link>
            <router-link
              to="/checkout"
              class="btn btn-primary m-1"
              v-bind:disabled="items.length == 0"
            >Checkout</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { mapActions, mapState } from "vuex";
import CartLine from "./CartLine";
import Navbar from "./Navbar";

export default {
  components: {
    Navbar,
    CartLine,
  },
  computed: {
    ...mapState({
      items: (state) => state.cart.items,
      message: (state) => state.cart.message,
    }),
  },
  methods: {
    ...mapActions('cart', {
              getCart: 'getCart',
              addCart: 'addCart',
              updateCart: 'updateCart',
              deleteCart: 'deleteCart',
          }),
    handleQuantityChange(line, $event) {
      this.change({ line, quantity: $event });
    },
  },
  created(){
    this.getCart()
  }
};
</script>

