<template>
  <div>
    <Navbar />
    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <thead>
          <tr>
            <th style="width:48%">Product</th>
            <th style="width:10%">Price</th>
            <th style="width:8%">Quantity</th>
            <th style="width:22%" class="text-center">Subtotal</th>
            <th style="width:12%"></th>
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
        <tfoot>
          <tr>
            <td>
              <router-link to="/" class="btn btn-warning">
                <i class="fa fa-angle-left"></i>Back to shop
              </router-link>
            </td>
            <td colspan="2" class="hidden-xs"></td>
            <td class="hidden-xs text-center">
              <strong>Total ${{ items.reduce((total, item) => total + (item.quantity * item.price), 0) }}</strong>
            </td>

            <td>
              <router-link
                to="/checkout"
                class="btn btn-success btn-block"
                v-bind:disabled="items.length == 0"
              >
                Checkout <i class="fa fa-angle-right" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
        </tfoot>
      </table>      
    </div>
  <Footer/>
  </div>
</template>
    
<script>
import { mapActions, mapState } from "vuex";
import CartLine from "./CartLine";
import Navbar from "./Navbar";
import Footer from "../components/Footer"

export default {
  components: {
    Navbar,
    CartLine,
    Footer
  },
  computed: {
    ...mapState({
      items: (state) => state.cart.items,
      message: (state) => state.cart.message,
    }),
  },
  methods: {
    ...mapActions("cart", {
      getCart: "getCart",
      addCart: "addCart",
      updateCart: "updateCart",
      deleteCart: "deleteCart",
    }),
    handleQuantityChange(line, $event) {
      this.change({ line, quantity: $event });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

