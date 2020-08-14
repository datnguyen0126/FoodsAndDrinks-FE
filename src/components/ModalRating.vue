<template>
  <div class="normal-case tracking-normal">
    <a @click.prevent="show" class="text-copy-primary uppercase">Rating here</a>
    <modal name="modal-rating" id="modal-1" @opened="opened" :adaptive="true" :height="400" :width="600">
      <div class="rating">
        <ul class="list">
          <li @click="rate(star)" v-for="star in 5" style=""
            :class="{ 'active': star <= stars }"
            :key="star.stars"
            class="star">
            <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i>
          </li>
        </ul>
        <div v-if="hasCounter" class="info counter">
          <span class="score-rating">{{ stars }}</span>
          <span class="divider">/</span>
          <span class="score-max">{{ maxStars }}</span>
        </div>
        <button @click="handleSubmit(id)">Submit</button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: "Rating",
  props: ["id","grade", "maxStars", "hasCounter"],
  data() {
    return {
      stars: this.grade,
    };
  },
  methods: {
    show() {
        this.$modal.show('modal-rating')
      },
    rate(star) {
      if (typeof star === "number" && star <= 5 && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
      }
    },
    ...mapActions('foods', {
      add: 'addRating'
    }),
    handleSubmit(id){
      this.$modal.hide('modal-rating')
      this.add({food_id: id, score: this.stars});
      
    },
  },
};
</script>
<style scoped lang="scss">
@import "../styles/rating.scss";

</style>
