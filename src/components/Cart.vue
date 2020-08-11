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
                <th>Quantity</th>
                <th>Product</th>
                <th class="text-right">Price</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="lines.length == 0">
                <td colspan="4" class="text-center">Your cart is empty</td>
              </tr>
              <!-- <cart-line
              v-for="line in lines"
              v-bind:key="line.product.id"
              v-bind:line="line"
              v-on:quantity="handleQuantityChange(line, $event)"
              v-on:remove="remove"
              />-->
            </tbody>
            <tfoot v-if="lines.length > 0">
              <tr>
                <td colspan="3" class="text-right">Total:</td>
                <td class="text-right">{{ totalPrice }}</td>
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
              v-bind:disabled="lines.length == 0"
            >Checkout</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
//import CartLine from "./CartLine";
import Navbar from "./Navbar";
import axios from "axios";
import { authHeader } from "../_helpers";

let be_url = process.env.VUE_APP_DJANGO_HOST;
const url = `${be_url}/cart/`;
export default {
  components: {
    Navbar,
  },
  data: function () {
    return {
      products: [],
      lines: 0,
    };
  },
  methods: {},
  created() {
    axios
      .get(url, {
        headers: authHeader(),
      })
      .then((resp) => {
        console.log(resp.data);
      });
  },
};
</script>