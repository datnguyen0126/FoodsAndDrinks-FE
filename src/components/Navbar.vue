<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Da Nang Milktea</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form class="mr-sm-5">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <router-link v-if="account.user !== null" :to="{ name: 'cart_page'}" type="button" class="btn btn-light mr-sm-4">Cart</router-link>
        <router-link v-if="account.user === null" :to="{ name: 'login_page'}" type="button" class="btn btn-primary">Login</router-link>
        <b-nav-item-dropdown right v-else>
          <template v-slot:button-content>
            <em>{{account.user.name}}</em>
          </template>
          <b-dropdown-item >
            <router-link to="/profile" class="btn btn-link">Profile</router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
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
