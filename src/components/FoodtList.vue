<template>
  <div class="col-sm-9 padding-right">
    <div class="features_items">
      <div class="col-sm-6">
        <div class="product-image-wrapper" v-for=" food in foods.foods" :key="food.id">
          <div class="single-products mb-3">
            <div class="productinfo text-center">
              <img v-if="food.images[0]" :src="food.images[0].image_url" class="img-food" />
              <img v-else class="img-food" />
              <h2>{{food.price}}</h2>
              <p>{{food.name}}</p>
              <button v-on:click="addCart(food.id, 1)" class="btn btn-default add-to-cart">
                <i class="fa fa-shopping-cart"></i>Add to cart
              </button>
              <router-link
                :to="{ name: 'food_detail', params: { id: food.id}}"
                class="btn btn-primary text-light"
              >Detail</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      v-if="!foods.filter"
      :total-pages="foods.page_total"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Pagination from "../components/Pagination";

import axios from "axios";
import { authHeader } from "../_helpers";

let be_url = process.env.VUE_APP_DJANGO_HOST;
const url = `${be_url}/cart/`;
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      foods: (state) => state.foods.all,
    }),
  },
  created() {
    this.getAll({ page: 1 });
  },
  methods: {
    addCart: function (food_id, quantity) {
      let data = {
        'food_id': food_id,
        'quantity': quantity
      }
      axios
        .post(url, data, {
          withCredentials: true,
          headers: authHeader()
        })
        .then((resp) => {
          console.log(resp.data);
        });
    },
    ...mapActions("foods", {
      getAll: "getAll",
    }),
    onPageChange(page) {
      this.currentPage = page;
      this.getAll({ page });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/foodlist.scss";
</style>
