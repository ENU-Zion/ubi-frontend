<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>{{$t('Application')}}</strong>
      </div>
      <label for="name">
        <strong>{{$t('Name')}}</strong>
      </label>
      <p>{{candidate.name}}</p>
      <label for="name">
        <strong>{{$t('Apply Time')}}</strong>
      </label>
      <p>{{candidate.apply_time|formatDate}}</p>
      <div v-if="candidate.close_time">
        <label for="name">
          <strong>{{$t('Close Time')}}</strong>
        </label>
        <p>{{candidate.close_time|formatDate}}</p>
      </div>
      <label for="name">
        <strong>{{$t('Yes')}}</strong>
      </label>
      <p>{{candidate.yes_list}}</p>
      <label for="name">
        <strong>{{$t('No')}}</strong>
      </label>
      <p>{{candidate.no_list}}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "application",
  props: ["candidate"],
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
