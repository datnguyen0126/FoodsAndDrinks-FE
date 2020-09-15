<template>
  <div class="col-sm-9 padding-right">
    <div class="features_items">
    <h1 class="mt-4" v-if="foods.all">Popular Dishes</h1>
    <h1 class="mt-4" v-if="foods.search">Search Results for: {{foods.q}}</h1>
    <h1 class="mt-4" v-if="foods.category">{{getCategory(foods.id)}} {{category}}</h1>
      <div class="col-sm-8">
        <div class="product-image-wrapper" v-for=" food in foods.foods" :key="food.id">
          <div class="row p-2">
            <div class="col-auto">
              <img v-if="food.images[0]" :src="food.images[0].image_url" class="img-food rounded" />
              <img v-else class="img-food" />
            </div>
            <div class="col-5 mt-5" >
              <h2 class="">${{ Math.ceil(food.price)}}</h2>
              <p>{{food.name}}</p>
              <i v-for="star in Math.ceil(food.avg_rating)" :key="star.stars" class= 'fas fa-star' style="color: #ffe100;"></i>
            </div>
            <div class="col mt-5">
              <button v-on:click="addCart(food.id, 1)" class="btn btn-danger add-to-cart mr-1">
                <i class="fa fa-shopping-cart"></i> Add to cart
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
      v-if="foods.all"
      :total-pages="foods.page_total"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Pagination from "../components/Pagination";
import { categoryService } from "../_services/category.services";
import axios from "axios";
import { authHeader } from "../_helpers";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
let be_url = process.env.VUE_APP_DJANGO_HOST;
const url = `${be_url}/cart/`;

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      category: ''
    };
  },
  computed: {
    ...mapState({
      foods: (state) => state.foods.all,
    }),
  },
  created() {
    this.getAll({ page: 1 });
    if(this.foods.id) {
      this.getCategory(this.foods.id)
    }
  },
  methods: {
    addCart: function (food_id, quantity) {
      let data = {
        food_id: food_id,
        quantity: quantity,
      };
      axios
        .post(url, data, {
          withCredentials: true,
          headers: authHeader(),
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
    getCategory(id){
      categoryService.getResults().then((res) => {
        this.category = res.data.filter(item => item.id===id)[0].name
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import "../styles/foodlist.scss";
</style>
