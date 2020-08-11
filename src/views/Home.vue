<template>
    <div class="container-fluid">
        <Navbar/>
        <div class="row">
            <div class="col-sm-3">	
                <category/>
            </div>
            <FoodtList/>
        </div>
    </div>

    
    
</template>

<script>
    import FoodtList from '../components/FoodtList'
    import Navbar from '../components/Navbar'
    import Category from '../components/Category'
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
            Category
            }
    }
</script>

