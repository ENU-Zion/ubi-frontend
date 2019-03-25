<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            <strong>{{$t('Candidates')}}</strong>
          </div>
          <b-table
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :small="small"
            :fixed="fixed"
            responsive="sm"
            :items="items"
            :fields="fields"
            @row-clicked="rowClicked"
          >
            <template slot="name" slot-scope="data">
              <strong>{{data.item.name}}</strong>
            </template>
            <template slot="apply_time" slot-scope="data">
              <strong>{{data.item.apply_time|formatDate}}</strong>
            </template>
            <!-- <template slot="close" slot-scope="data">
              <strong>{{data.item.close_time>0?"FAILED":""}}</strong>
            </template>-->
            <template slot="yes" slot-scope="data">
              <strong>{{data.item.yes_list.length}}</strong>
            </template>
            <template slot="no" slot-scope="data">
              <strong>{{data.item.no_list.length}}</strong>
            </template>
            <template slot="my_vote" slot-scope="data">
              <strong>{{myVote(data.item)}}</strong>
            </template>
          </b-table>
          <div class="text-center">
            <b-button type="submit" variant="primary" @click="more">{{$t('More')}}</b-button>
          </div>
        </b-card>
      </transition>
      <transition name="slide">
        <b-card>
          <div slot="header">
            <strong>{{$t('Failed Applications')}}</strong>
          </div>
          <b-table
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :small="small"
            :fixed="fixed"
            responsive="sm"
            :items="fails"
            :fields="failedFields"
            @row-clicked="rowClicked"
          >
            <template slot="name" slot-scope="data">
              <strong>{{data.item.name}}</strong>
            </template>
            <template slot="close_time" slot-scope="data">
              <strong>{{data.item.close_time|formatDate}}</strong>
            </template>
            <template slot="yes" slot-scope="data">
              <strong>{{data.item.yes_list.length}}</strong>
            </template>
            <template slot="no" slot-scope="data">
              <strong>{{data.item.no_list.length}}</strong>
            </template>
            <template slot="my_vote" slot-scope="data">
              <strong>{{myVote(data.item)}}</strong>
            </template>
          </b-table>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Candidates",
  props: {
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    formatDate: function(value) {
      return new Date(value * 1000).toLocaleString();
    }
  },
  data: () => {
    return {
      /* items: usersData, */
      fields: [
        { key: "name" },
        { key: "apply_time" },
        { key: "yes" },
        { key: "no" },
        { key: "my_vote" }
      ],
      failedFields: [
        { key: "name" },
        { key: "close_time" },
        { key: "yes" },
        { key: "no" },
        { key: "my_vote" }
      ] /* ,
      currentPage: 1,
      perPage: 10,
      totalRows: 0 */,
      fails: []
    };
  },
  created: function() {
    this.more();
  },
  computed: {
    items() {
      let list = Array.from(this.$store.state.candidates);
      for (let i = 0; i < list.length; i++) {
        if (list[i].close_time > 0) {
          if (this.fails.indexOf(list[i]) === -1) {
            this.fails.push(list[i]);
          }
          delete list[i];
        }
      }
      return list.sort((a, b) => {
        return a.apply_time - b.apply_time;
      });
    }
  },
  methods: {
    myVote: function(value) {
      //onsole.log(value);
      let user = this.$store.state.account.name;
      if (value.yes_list.includes(user)) {
        return "YES";
      } else if (value.no_list.includes(user)) {
        return "NO";
      } else {
        return "";
      }
    },
    more() {
      this.$store.dispatch("moreCandidates");
    },
    /* getRowCount(items) {
      return items.length;
    }, */
    userLink(name) {
      return `candidates/${name.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item.name);
      console.log(userLink);
      this.$router.push({ path: userLink });
    }
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
