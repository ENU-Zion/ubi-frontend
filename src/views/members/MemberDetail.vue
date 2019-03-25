<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>{{$t('Member')}}</strong>
      </div>
      <label for="name">
        <strong>{{$t('Name')}}</strong>
      </label>
      <p>{{member.name}}</p>
      <label for="name">
        <strong>{{$t('Last Claim Time')}}</strong>
      </label>
      <p>{{member.last_claim_time|formatDate}}</p>
      <!-- <label for="name">
        <strong>Yes</strong>
      </label>
      <p>{{candidate.yes_list}}</p>
      <label for="name">
        <strong>No</strong>
      </label>
      <p>{{candidate.no_list}}</p>-->
    </b-card>
  </div>
</template>
<script>
export default {
  name: "member-detail",
  props: ["member"],
  /* created: function() {
    console.log(candidate);
  }, */
  filters: {
    formatDate: function(value) {
      return new Date(value * 1000).toLocaleString();
    }
  },
  methods: {}
};
</script>
