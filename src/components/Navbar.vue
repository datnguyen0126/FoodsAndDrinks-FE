<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
    <div class="container">
        <a class="navbar-brand" href="#">
          Da Nang Milktea
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Cart</a>
            </li>
            <li class="nav-item">
              <router-link v-if="account.user === null" :to="{ name: 'login_page'}" class="btn btn-primary text-light">Login</router-link>
              <span v-else> <a @click="logout()" class="btn btn-primary text-light">Logout({{account.user.name}})</a></span>
            </li>
          </ul>
        </div>
      </div>        
   </nav>
</template>


<script>
  import { mapState, mapActions} from 'vuex'
  export default {
    name: "Navbar",
    computed: {
      ...mapState({
        account: state => state.account,
        })
      },
      methods:{
        ...mapActions('account',{
          logout:'logout',
        })
      },
  };
</script>
