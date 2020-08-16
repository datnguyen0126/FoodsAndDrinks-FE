<template>
   <div class="register">
        <h2>Your Profile</h2>
        <form @submit.prevent="handleSubmit">

            <div class="form-group">
                <label>Email</label>
                <input type="text" v-model="account.user.email" class="form-control" readonly/>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="user.name" v-validate="'required'" name="name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="phone">Telephone</label>
                  <input v-model="user.phone" class="form-control" type="tel" value="1-(555)-555-5555" id="example-tel-input">
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <label for="inputAddress2">Address</label>
                <input v-model="user.address" type="text" class="form-control" id="inputAddress2">
            </div>
             <router-link to="/profile/change_password" class="btn btn-link">Change password</router-link>
            <div class="form-group">
                
                <button class="btn btn-primary" >Update</button>
                <img v-show="account.status.updating"/>
                <router-link to="/" class="btn btn-link">Back</router-link>
                <p v-show="account.status.updated">Change profile success</p>
            </div>
        </form>
        <Footer/>
    </div>
</template>

<script>
import Footer from '../components/Footer'
import { mapState, mapActions } from 'vuex'

export default {
    components:{
        Footer
    },
    data () {
        return {
            user: {
                name: '',
                address: '',
                phone: '',
            },
            submitted: false
        }
    },
    computed: {
      ...mapState({
        account: state => state.account,
        })
    },
    created () {
       this.user= this.account.user
    },
    methods: {
        
        ...mapActions('account', ['update']),
        handleSubmit() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid&& this.check_for_phone(this.user.phone)) {
                   this.update(this.user)
                }
            });
        },
         check_for_phone(phoneNumber){
            if(phoneNumber===null) 
                return true
            const Regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
            return Regex.test(phoneNumber) 
        }
    }
};
</script>

<style scoped lang="scss">
@import "../styles/form.scss";
</style>

