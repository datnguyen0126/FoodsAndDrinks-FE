<template>
  <div class="container-fluid">
    <Navbar />
    <div class="row">
      <div class="col-sm-3">
        <Category />
      </div>
      <div class="container">
        <div class="row">
          <main class="post blog-post col-lg-8">
            <div class="container">
              <div class="post-single">
                <div v-for="n in food.images.length" :key="n">
                  <img v-bind:src="food.images[n-1].image_url" />
                </div>
                <div class="post-details">
                  <h1 class="food-detail">{{food.name}}</h1>
                  <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
                    <div class="d-flex align-items-center flex-wrap">
                      <div class="date mt-1">
                        Price:
                        <im class="text-danger">${{ Math.ceil(food.price)}}</im>
                        <br />
                        <div class="row mt-1">
                          <div class="col-auto">
                            <im
                              v-for="star in Math.ceil(food.avg_rating)"
                              :key="star.stars"
                              class="fas fa-star star"
                            />
                          </div>
                          <div class="col-auto">
                            <modal-rating :id="this.$route.params.id" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="post-body">
                    <h4 class="mt-4">Description:</h4>
                    <p class="description">{{food.description}}</p>
                  </div>

                  <div class="add-comment">
                    <header>
                      <h3 class="h4">Leave a reply:</h3>
                    </header>

                    <form @submit.prevent="handleSubmit">
                      <div class="row">
                        <div class="form-group col-md-12">
                          <textarea
                            name="content"
                            v-model="content"
                            placeholder="Type your comment"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group col-md-12">
                          <button type="submit" class="btn btn-secondary">Submit Comment</button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="post-comments">
                    <header>
                      <h3 class="h6">
                        Post Comments
                        <span class="no-of-comments">({{comments.length}})</span>
                      </h3>
                    </header>
                    <div class="comment" v-for="cmt in comments" :key="cmt.id">
                      <div class="comment-header d-flex justify-content-between">
                        <div class="row user">

                          <div class="col-auto">
                            <avatar v-bind:fullname="cmt.user.name" size="35" class="mr-3" />
                          </div>
                          <div class="mt-2"> 
                            <span class="date">
                              {{cmt.user.name}}</span>&nbsp;
                            <span class="date">{{format_date(cmt.created_at)}}</span>
                          </div>

                          <div class="col-auto mt-2 " v-if="account.id == cmt.user.id">
                            <span v-if="cmt.deleting">
                              <em>- Deleting...</em>
                            </span>
                            <span
                              v-else-if="cmt.deleteError"
                              class="text-danger"
                            >- ERROR: {{cmt.deleteError}}</span>
                            <span v-else>
                              <a @click="deleteComment({id: cmt.id})" class="text-danger">Delete</a>
                            </span>
                          </div>

                        </div>
                      </div>
                      <div class="body-comment">
                        <p>{{cmt.content}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Avatar from "vue-avatar-component";
import moment from "moment";
import Navbar from "../components/Navbar";
import ModalRating from "../components/ModalRating";
import Category from "../components/Category";
export default {
  components: {
    Navbar,
    ModalRating,
    Avatar,
    Category,
  },
  data() {
    return {
      content: "",
      modalOpen: false,
    };
  },
  computed: {
    ...mapState({
      comments: (state) => state.comments.all.items,
      account: (state) => state.account.user,
      food: (state) => state.foods.all.food,
    }),
  },
  created() {
    this.comments = this.getAllComment({ food_id: this.$route.params.id });
    this.foodDetail = this.getDetail({ id: this.$route.params.id });
  },
  methods: {
    ...mapActions("comments", {
      getAllComment: "getAll",
      add: "add",
      deleteComment: "delete",
      updateComment: "update",
    }),
    ...mapActions("foods", {
      getDetail: "getDetail",
    }),
    format_date(value) {
      if (value) {
        return moment(String(value)).format("hh:mm - MM/DD/YYYY");
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
    handleSubmit() {
      const { content } = this;
      if (content) {
        this.add({ content, food_id: this.$route.params.id });
      }
    },
  },
};
</script>
<style scoped>
@import "../styles/detail.scss";
</style>
