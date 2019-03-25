<template>
  <div>
    <button type="button" class="btn btn-primary" v-if="accountName">{{ accountName }}</button>
    <span style="margin:10px"></span>
    <button type="button" class="btn btn-danger" v-if="accountName" @click="logout">Logout</button>
    <button type="button" class="btn btn-success" v-if="!accountName" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "Account",
  components: {},
  data: () => {
    return { accountName: undefined };
  },
  created: function() {
    this.login();
  },
  methods: {
    logout: function() {
      console.log("logout");
      this.chain.changeIdentity();
      this.accountName = undefined;
    },
    login: function() {
      this.chain.connectIdentity().then(account => {
        this.accountName = account.name;
      });
    }
  }
};
</script>
