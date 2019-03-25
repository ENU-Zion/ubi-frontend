<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            <strong>{{$t('Members')}}</strong>
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
            <template slot="last_claim_time" slot-scope="data">
              <strong>{{data.item.last_claim_time|formatDate}}</strong>
            </template>
            <!-- <template slot="yes" slot-scope="data">
              <strong>{{data.item.yes_list.length}}</strong>
            </template>
            <template slot="no" slot-scope="data">
              <strong>{{data.item.no_list.length}}</strong>
            </template>-->
          </b-table>
          <div class="text-center">
            <b-button type="submit" variant="primary" @click="more">{{$t('More')}}</b-button>
          </div>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Members",
  props: {
    caption: {
      type: String,
      default: "Members"
    },
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
  data: () => {
    return {
      fields: [
        { key: "name" },
        {
          key: "last_claim_time"
        } /* ,
        { key: "yes" },
        { key: "no" } */
      ]
    };
  },
  created: function() {
    this.more();
  },
  computed: {
    items() {
      return this.$store.state.members;
    }
  },
  filters: {
    formatDate: function(value) {
      return new Date(value * 1000).toLocaleString();
    }
  },
  methods: {
    more() {
      this.$store.dispatch("moreMembers");
    },
    userLink(name) {
      return `members/${name.toString()}`;
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
