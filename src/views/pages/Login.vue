<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body class="text-center">
                <h1>{{$t('Login')}}</h1>
                <p class="text-muted">{{$t('LoginDesc')}}</p>
                <b-button variant="primary" class="px-4" @click="login">{{$t('Login')}}</b-button>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary p-4">
              <b-card-body class="text-center">
                <div>
                  <h1>{{$t('Sign up')}}</h1>
                  <p>{{$t('RegisterDesc')}}</p>
                  <b-button
                    variant="primary"
                    class="active mt-3"
                    @click="create"
                  >{{$t('Register Now')}}!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  created: function() {
    this.login();
  },
  methods: {
    login: function() {
      this.chain.connectIdentity().then(account => {
        this.$store.commit("setAccount", account);
        this.$router.push({ path: "/" });
      });
    },
    create: function() {
      window.open("https://t.me/FreeEnuAccountBot", "_blank");
    }
  }
};
</script>
