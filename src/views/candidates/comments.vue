<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>{{$t('Comments')}}</strong>
      </div>
      <b-table
        :hover="true"
        :striped="true"
        :bordered="false"
        :small="false"
        :fixed="false"
        responsive="sm"
        :items="comments"
        :fields="fields"
      >
        <template slot="voter" slot-scope="data">
          <strong>{{data.item.voter}}</strong>
        </template>
        <template slot="opinion" slot-scope="data">
          <strong>{{data.item.opinion?"yes":"no"}}</strong>
        </template>
        <template slot="comment" slot-scope="data">
          <strong>{{data.item.content}}</strong>
        </template>
        <template slot="vote_time" slot-scope="data">
          <strong>{{data.item.vote_time|formatDate}}</strong>
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "comments",
  props: ["comments"],
  data: () => {
    return {
      fields: [
        { key: "voter" },
        { key: "opinion" },
        { key: "comment" },
        { key: "vote_time" }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      return new Date(value * 1000).toLocaleString();
    }
  },
  methods: {}
};
</script>
