<template>
  <div class="col-sm-9 padding-right">
    <div class="features_items">
      <div class="col-sm-6">
        <div class="product-image-wrapper" v-for=" food in foods.foods" :key="food.id">
          <div class="single-products mb-3">
            <div class="productinfo text-center">
              <img v-if="food.images[0]" :src="food.images[0].image_url" class="img-food"/>
              <img v-else class="img-food"/>
              <h2>{{food.price}}</h2>
              <p>{{food.name}}</p>
              <a href="#" class="btn btn-default add-to-cart">
                <i class="fa fa-shopping-cart"></i>Add to cart
              </a>
              <router-link :to="{ name: 'food_detail', params: { id: food.id}}" class="btn btn-primary text-light">Detail</router-link>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  <pagination
   :total-pages="foods.page_total"
   :current-page="currentPage"
   @pagechanged="onPageChange"
 />
  </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex'
    import Pagination from "../components/Pagination";
    export default {
      components: {
        Pagination, 
      },
      data(){
          return{
              currentPage: 1
          }
      },
      computed: {
        ...mapState({
            foods: state => state.foods.all,
        })
      },
      created () {
        this.getAll({page:1});
      },
      methods:{
        ...mapActions('foods',{
          getAll: 'getAll'
        }),
        onPageChange(page){
          this.currentPage=page
          this.getAll({page});
        }
      },
    }
</script>

<style scoped lang="scss"> 
@import "../styles/foodlist.scss";
</style>
