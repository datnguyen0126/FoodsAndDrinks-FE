<template>
    <div class="container-fluid">
        <Navbar/>
        <div class="row">
            <div class="col-sm-3">
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

