<template>
    <div class="container-fluid">
        <Navbar/>
        <div class="row">
            <div class="col-sm-3">
					
                <div class="left-sidebar">
					<h2>Category</h2>
					<div class="panel-group category-products" id="accordian">
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
            <FoodtList/>
           
        </div>
    </div>

    
    
</template>

<script>
    import FoodtList from '../components/FoodtList'
    import Navbar from '../components/Navbar'
    import { mapState, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapState({
                account: state => state.account,
            })
        },
        methods:{
            ...mapActions('account',{
                logout:'logout',
            }),
        },
        components: {
            FoodtList, 
            Navbar,
            }
    }
</script>

