<template>
    <div class="login">
        <h2>Change password here</h2>
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label htmlFor="current_password">Current Password</label>
                <input type="password" v-model="current_password" v-validate="{ required: true, min: 6 }" name="current_password" class="form-control"  :class="{ 'is-invalid': submitted && !current_password }" />
                <div v-show="submitted && !current_password" class="invalid-feedback">Old password is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="new_password">New Password</label>
                <input type="password" v-model="new_password" name="new_password" class="form-control" :class="{ 'is-invalid': submitted && !new_password }" />
                <div v-show="submitted && !new_password" class="invalid-feedback">New password is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="confirm_passworfd">Confirm Password</label>
                <input type="password" v-model="confirm_passworfd" name="confirm_passworfd" class="form-control" :class="{ 'is-invalid': submitted && !confirm_passworfd }" />
                <div v-show="submitted && !confirm_passworfd" class="invalid-feedback">Enter confirm password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.changing">Save</button>
                <img v-show="status.changing"/>
                <router-link to="/profile" class="btn btn-link">Back</router-link>
            </div>
        </form>
        <Footer/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Footer from '../components/Footer'

export default {
    components:{
        Footer
    },
    data () {
        return {
            current_password: '',
            new_password: '',
            confirm_passworfd: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        this.logout();
    },
    methods: {
        ...mapActions('account', ['change_password']),
        handleSubmit () {
            this.submitted = true;
            const { current_password, new_password, confirm_passworfd } = this;
            if(new_password===confirm_passworfd)
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.change_password({ current_password, new_password})
                    }
                });
        }
    }
};
</script>
<style scoped lang="scss">
@import "../styles/form.scss";
</style>
