<template>
  <div class="animated fadeIn">
    <application v-if="candidate" :candidate="candidate"/>
    <profile v-if="!candidate" :name="$store.state.account.name"/>
    <b-card header-tag="header" v-if="!candidate||candidate.close_time">
      <div slot="header">
        <strong>{{$t('Apply')}}</strong>
      </div>
      <p>{{$t('FailedDesc')}}</p>
      <div class="text-center">
        <b-button type="submit" variant="primary" @click="apply">{{$t('Apply')}}</b-button>
      </div>
    </b-card>
    <b-card header-tag="header" v-if="candidate&&!candidate.close_time">
      <div slot="header">
        <i class="fa fa-align-justify"></i>
        {{$t('Activate')}}
      </div>
      <p>{{$t('CheckDesc')}}</p>
      <p>{{$t('PassRule')}}</p>
      <div class="text-center">
        <b-button type="submit" variant="primary" @click="activate">{{$t('Check')}}</b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import Application from "./Application";
import Profile from "./ProfileDetail";

export default {
  name: "apply",
  components: {
    Application,
    Profile
  },
  data: () => {
    return {
      candidate: null
    };
  },
  watch: {
    "$store.state.account": {
      handler: function(newer, older) {
        this.chain.getCandidate(newer.name).then(candidate => {
          this.candidate = candidate;
        });
      },
      deep: true // 开启深度监听
    }
  },
  created: function() {
    this.getCandidate();
  },
  filters: {
    formatDate: function(value) {
      return new Date(value * 1000).toLocaleString();
    }
  },
  methods: {
    getCandidate: function() {
      this.chain
        .getCandidate(this.$store.state.account.name)
        .then(candidate => {
          if (candidate) {
            this.candidate = candidate;
          }
        });
    },
    apply: function() {
      this.chain
        .apply()
        .then(res => {
          this.$message.success("txid : " + res.transaction_id);
          this.getCandidate();
          this.$store.commit("initCandidates");
          this.$store.dispatch("moreCandidates");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    activate: function() {
      this.chain
        .activate()
        .then(res => {
          this.$message.success("txid : " + res.transaction_id);
          this.getCandidate();
          this.$store.commit("initCandidates");
          this.$store.dispatch("moreCandidates");
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
