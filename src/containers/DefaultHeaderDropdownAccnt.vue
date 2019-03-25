<template>
  <div>
    <button type="button" class="btn btn-success" v-if="!accountName" @click="login">{{$t('Login')}}</button>
    <AppHeaderDropdown right no-caret v-if="accountName">
      <template slot="header">
        <!-- <img src="img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"> -->
        <button
          type="button"
          class="btn btn-primary btn-pill"
          v-if="accountName"
          style="padding:5px"
        >{{ accountName.substr(0,1) }}..{{ accountName.substr(accountName.length-1,1) }}</button>
      </template>
      <template slot="dropdown">
        <!--<b-dropdown-header tag="div" class="text-center">
        <strong>Account</strong>
      </b-dropdown-header>
       <b-dropdown-item>
        <i class="fa fa-bell-o"/> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-envelope-o"/> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-tasks"/> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-comments"/> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        <i class="fa fa-user"/> Profile
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-wrench"/> Settings
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-usd"/> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-file"/> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider/>
      <b-dropdown-item>
        <i class="fa fa-shield"/> Lock Account
        </b-dropdown-item>-->
        <b-dropdown-header tag="div" class="text-center">
          <strong>{{$t('Settings')}}</strong>
        </b-dropdown-header>
        <b-dropdown-item @click="changeLang">
          <i class="fa fa-language"/>
          {{$t('Change Language')}}
          <!-- <i class="flag-icon flag-icon-gb"/> -->
          <!-- <i class="flag-icon flag-icon-cn"></i> -->
          <!-- <b-badge variant="primary">123</b-badge> -->
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          <i class="fa fa-lock"/>
          {{$t('Logout')}}
        </b-dropdown-item>
      </template>
    </AppHeaderDropdown>
  </div>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { language: undefined };
  },
  computed: {
    accountName() {
      return this.$store.state.account.name;
    }
  },
  created: function() {
    this.checkLogin();
    this.language = localStorage.getItem("language");
    this.$i18n.locale = this.language;
  },
  methods: {
    logout: function() {
      console.log("logout");
      this.chain.changeIdentity().then(() => {
        this.$store.commit("removeAccount");
        this.$router.push({ path: "/" });
      });
    },
    login: function() {
      this.$router.push({ path: "/pages/login" });
    },
    checkLogin: function() {
      this.chain.connectIdentity().then(account => {
        this.$store.commit("setAccount", account);
      });
    },
    changeLang: function() {
      if (this.language == "en") {
        localStorage.setItem("language", "zh");
        this.$i18n.locale = "zh";
        this.language = "zh";
      } else {
        localStorage.setItem("language", "en");
        this.$i18n.locale = "en";
        this.language = "en";
      }
    }
  }
};
</script>