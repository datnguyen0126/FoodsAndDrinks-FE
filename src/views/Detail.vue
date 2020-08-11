<template>
    <div class="container-fluid">
        <Navbar/>
        <div class="row">
          <div class="col-sm-3">
            <div class="left-sidebar">
					<h2>Category</h2>
					<div class="panel-group category-products" id="accordian"><!--category-productsr-->
						<div class="panel panel-default">
							<div class="panel-heading">
								<h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                    <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                      Sportswear
                  </a>
								</h4>
							</div>
							<div id="sportswear" class="panel-collapse collapse">
								<div class="panel-body">
									<ul>
										<li><a href="#">Nike </a></li>
										<li><a href="#">Under Armour </a></li>
										<li><a href="#">Adidas </a></li>
										<li><a href="#">Puma</a></li>
										<li><a href="#">ASICS </a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
        </div>
      </div>
    <div class="container">
      <div class="row">
        <main class="post blog-post col-lg-8"> 
          <div class="container">
            <div class="post-single">
            <div v-for="n in food.images.length" :key="n" >
              <img v-bind:src="food.images[n-1].image_url" style="height:400px; width:600px;">
            </div>
              <div class="post-details">
                <h1>{{food.name}}<a href="#"><i class="fa fa-bookmark-o"></i></a></h1>
                <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
                  <div class="d-flex align-items-center flex-wrap">   

                    <div class="date">
                    <i class="icon-clock">
                    </i> Price: {{ food.price | currency }}
                    <i v-for="star in Math.ceil(food.avg_rating)" :key="star.stars" class= 'fas fa-star' style="color: #ffe100;"></i>
                    </div>
                  </div>
                </div>
                <div class="post-body">
                  <p class="lead">{{food.description}}</p>
                </div>
                <modal-rating :id="this.$route.params.id"/>
                
           <div class="add-comment">
                  <header>
                    <h3 class="h4">Leave a reply:</h3>
                  </header>


                  <form @submit.prevent="handleSubmit">
                    <div class="row">
                      <div class="form-group col-md-12">
                        <textarea name="content" v-model="content" placeholder="Type your comment" class="form-control"></textarea>
                      </div>
                      <div class="form-group col-md-12">
                        <button type="submit" class="btn btn-secondary">Submit Comment</button>
                      </div>
                    </div>
                  </form>

                </div>
          
                <div class="post-comments">
                  <header>
                    <h3 class="h6">Post Comments<span class="no-of-comments">({{comments.length}})</span></h3>
                  </header>
                  <div class="comment"  v-for="cmt in comments" :key="cmt.id">
                    <div class="comment-header d-flex justify-content-between">
                      <div class="user d-flex align-items-center">
                        <avatar v-bind:fullname="cmt.user.name" size="25" class="mr-3"/>
                        <div class="title"><strong>{{cmt.user.name}} </strong><span class="date"> {{format_date(cmt.created_at)}}</span></div>
                      </div>
                    </div>
                    <div class="comment-body">
                      <p>{{cmt.content}}</p>
                    </div>
                    <div v-if="account.id == cmt.user.id">
                      <span v-if="cmt.deleting"><em> - Deleting...</em></span>
                      <span v-else-if="cmt.deleteError" class="text-danger"> - ERROR: {{cmt.deleteError}}</span>
                      <span v-else><a @click="deleteComment({id: cmt.id})" class="text-danger">Delete</a></span>
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
  import {mapActions, mapState} from 'vuex'
  import Avatar from 'vue-avatar-component'
  import moment from 'moment';
  import Navbar from '../components/Navbar'
  import ModalRating from '../components/ModalRating'
  export default {
    components: {
      Navbar, 
      ModalRating,
      Avatar
    },
    data(){
        return{
            content: '',
            modalOpen: false
      }
    },
    computed: {
      ...mapState({
        comments: state => state.comments.all.items,
        account: state => state.account.user,
        food: state => state.foods.all.food,
        })
      },
      created () {
        this.comments =this.getAllComment({food_id:this.$route.params.id});
        this.foodDetail = this.getDetail({id: this.$route.params.id})
      },
      methods: {
          ...mapActions('comments', {
              getAllComment: 'getAll',
              add: 'add',
              deleteComment: 'delete',
              updateComment: 'update',
          }),
          ...mapActions('foods', {
              getDetail: 'getDetail'
          }),
          format_date(value){
            if (value) {
              return moment(String(value)).format('hh:mm - MM/DD/YYYY')
            }
          },
           formatPrice(value) {
              let val = (value/1).toFixed(2).replace('.', ',')
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          openModal() {
              this.modalOpen = !this.modalOpen;
          },
          handleSubmit () {
            const {content } = this;
            if (content) {
                this.add({content,food_id: this.$route.params.id })
            }
          }
        },
      }
</script>
<style scoped>
@import "../styles/rating.scss";
.product-image-wrapper {
    border: 1px solid #F7F7F5;
    overflow: hidden;
    margin-bottom: 30px;
}
.single-products {
    position: relative;
}
</style>
