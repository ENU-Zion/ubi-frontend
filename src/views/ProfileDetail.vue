<template>
  <b-row>
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">
          <strong>{{$t('Profile')}}</strong>
        </template>
        <b-table striped small fixed responsive="sm" :items="items" :fields="fields">
          <template slot="value" slot-scope="data">
            <strong>{{data.item.value}}</strong>
          </template>
        </b-table>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import chain from "../chain.js";

export default {
  name: "profile",
  props: ["name"],
  data: () => {
    return {
      items: [],
      fields: [{ key: "key" }, { key: "value" }]
    };
  },
  created: function() {
    this.getProfile().then(res => {
      this.items = res;
    });
  },
  methods: {
    async getProfile() {
      let user = null;
      try {
        user = await chain.getProfile(this.name);
        if (user) {
          user = JSON.parse(user);
        }
      } catch (err) {
        console.error(err);
      }
      const userDetails = user
        ? Object.entries(user)
        : [["Profile", "Not found"]];
      return userDetails.map(([key, value]) => {
        return { key: key, value: value };
      });
    }
  }
};
</script>
