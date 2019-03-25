<template>
  <b-row>
    <b-col cols="12">
      <application :candidate="candidate"/>
      <profile :name="candidate.name"/>
      <b-card>
        <div slot="header">
          <strong>{{$t('Vote')}}</strong>
        </div>
        <b-form>
          <b-form-group validated label="Comment" description="Please enter your comment.">
            <b-form-input v-model="comment" placeholder="comment.." required></b-form-input>
          </b-form-group>
          <div slot="footer">
            <b-row class="align-items-center">
              <b-col cols="12" sm="4" xl class="mb-3 mb-xl-0">
                <b-button block @click="goBack">{{$t('Back')}}</b-button>
              </b-col>
              <b-col cols="6" sm="4" xl class="mb-3 mb-xl-0">
                <b-button block variant="success" @click="vote(1)">{{$t('Yes')}}</b-button>
              </b-col>
              <b-col cols="6" sm="4" xl class="mb-3 mb-xl-0">
                <b-button block variant="danger" @click="vote(0)">{{$t('No')}}</b-button>
              </b-col>
              <b-col cols="6" sm="4" xl class="mb-3 mb-xl-0" v-if="isAdmin">
                <b-button block variant="primary" @click="add">{{$t('Pass')}}</b-button>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </b-card>
      <comments :comments="comments"/>
    </b-col>
  </b-row>
</template>

<script>
import Application from "../Application";
import Profile from "../ProfileDetail";
import { setTimeout } from "timers";
import comments from "./comments";

export default {
  name: "Candidate",
  components: {
    Application,
    Profile,
    comments
  },
  data: () => {
    return {
      candidate: {
        name: "",
        apply_time: "",
        yes_list: [],
        no_list: []
      },
      comments: [],
      comment: ""
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.account.name == "qsx.io";
    }
  },
  created: async function() {
    await this.getCandidate();
    this.getComments();
  },
  methods: {
    async getCandidate() {
      this.candidate = this.$store.getters.getCandidateByName(
        this.$route.params.account
      );
      if (!this.candidate) {
        this.candidate = await this.chain.getCandidate(
          this.$route.params.account
        );
      }
    },
    async getComments() {
      let res = await this.chain.getVoteRecords(this.candidate.name);
      this.comments = res.rows;
    },
    goBack() {
      this.$router.go(-1);
    },
    vote(opinion) {
      this.chain
        .vote(this.$route.params.account, opinion, this.comment)
        .then(res => {
          this.$message.success("txid : " + res.transaction_id);
          this.$store.dispatch("refreshCandidate", this.$route.params.account);
          setTimeout(async () => {
            await this.getCandidate();
            this.getComments();
          }, 500);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    add() {
      this.chain
        .add(this.$route.params.account)
        .then(res => {
          this.$message.success("txid : " + res.transaction_id);
          this.$store.commit("initCandidates");
          this.$store.dispatch("moreCandidates");
          this.$store.commit("initMembers");
          this.$store.dispatch("moreMembers");
          /* this.$store.dispatch("refreshCandidate", this.$route.params.account);
          let _getCandidate = this.getCandidate;
          setTimeout(function() {
            _getCandidate();
          }, 500); */
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
