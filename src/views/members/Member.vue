<template>
  <b-row>
    <b-col cols="12">
      <member-detail :member="member"/>
      <profile :name="this.$route.params.account"/>
      <b-row class="align-items-center">
        <b-col cols="12" sm="4" md="3" xl class="mb-3 mb-xl-0">
          <b-button block @click="goBack">{{$t('Back')}}</b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import MemberDetail from "./MemberDetail";
import Profile from "../ProfileDetail";
import { setTimeout } from "timers";

export default {
  name: "Member",
  components: {
    MemberDetail,
    Profile
  },
  data: () => {
    return {
      member: {
        name: "",
        last_claim_time: ""
      }
    };
  },
  created: async function() {
    this.member = this.$store.getters.getMemberByName(
      this.$route.params.account
    );
    if (!this.member) {
      this.member = await this.chain.getMember(this.$route.params.account);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
