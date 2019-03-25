<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="6">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{global.member_num}}</h4>
            <p>{{$t('Members')}}</p>
          </b-card-body>
          <card-line1-chart-example
            chartId="card-chart-01"
            class="chart-wrapper px-3"
            style="height:70px;"
            :height="70"
          />
        </b-card>
      </b-col>
      <b-col sm="6" lg="6">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{global.candidate_num}}</h4>
            <p>{{$t('Candidates')}}</p>
          </b-card-body>
          <card-line2-chart-example
            chartId="card-chart-02"
            class="chart-wrapper px-3"
            style="height:70px;"
            :height="70"
          />
        </b-card>
      </b-col>
    </b-row>
    <claim/>
    <candidates/>
  </div>
</template>

<script>
import CardLine1ChartExample from "./dashboard/CardLine1ChartExample";
import CardLine2ChartExample from "./dashboard/CardLine2ChartExample";
import Candidates from "../views/candidates/Candidates";
import Claim from "./members/Claim";

export default {
  name: "dashboard",
  components: {
    Candidates,
    CardLine1ChartExample,
    CardLine2ChartExample,
    Claim
  },
  data: function() {
    return {
      global: {}
    };
  },
  created: function() {
    this.chain.getGlobal().then(res => {
      this.global = res;
    });
  },
  methods: {}
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
