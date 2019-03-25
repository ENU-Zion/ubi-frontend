<template>
  <div class="animated fadeIn" v-if="member.name!=''">
    <member-detail :member="member"/>
    <b-card>
      <div slot="header">
        <strong>{{$t('Claim Reward')}}</strong>
      </div>
      <div class="text-center">
        <b-button type="submit" variant="primary" @click="claim">{{$t('Claim')}}</b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import MemberDetail from "./MemberDetail";

export default {
  name: "claim",
  components: {
    MemberDetail
  },
  data: () => {
    return {
      member: {
        name: "",
        last_claim_time: ""
      }
    };
  },
  watch: {
    "$store.state.account": {
      handler: function(newer, older) {
        /* this.chain.getCandidate(newer.name).then(candidate => {
          this.candidate = candidate;
        }); */
        this.getMember();
      },
      deep: true // 开启深度监听
    }
  },
  created: function() {
    this.getMember();
  },
  methods: {
    getMember: function() {
      this.chain.getMember(this.$store.state.account.name).then(res => {
        if (res) {
          this.member = res;
        }
      });
    },
    claim: function() {
      this.chain
        .claim()
        .then(res => {
          this.$message.success("txid : " + res.transaction_id);
          this.getMember();
          this.$store.commit("initMembers");
          this.$store.dispatch("moreMembers");
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
