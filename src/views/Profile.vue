<template>
  <div class="animated fadeIn">
    <b-card header-tag="header" footer-tag="footer">
      <div slot="header">
        <i class="fa fa-align-justify"></i>
        <strong>{{$t('User Profile')}}</strong>
        <!-- <small>justified tabs</small> -->
      </div>
      <div>
        <b-nav justified tabs>
          <b-nav-item @click="toSimple">{{$t('Simple')}}</b-nav-item>
          <b-nav-item @click="toCustomized">{{$t('Customized')}}</b-nav-item>
        </b-nav>
        <!-- simple -->
        <b-row v-if="type==1">
          <b-col>
            <b-card>
              <!-- <div slot="header">Basic Info</div> -->
              <b-form>
                <!-- name -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Name')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.name"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- email -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Email')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="email" autocomplete="email" v-model="json.email"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-envelope"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- avatar -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Avatar')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.avatar"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <!-- country -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Country')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.country"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-globe"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- blog -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Blog')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.blog"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-globe"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- twitter -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Twitter')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.twitter"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-twitter"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- weibo -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Weibo')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.weibo"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-weibo"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- github -->
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>{{$t('Github')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.github"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-github"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <!-- Self introduction -->
                <!-- <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Self Introduction</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="json.self_introduction"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-pencil"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>-->
                <b-form-group label="Self Introduction">
                  <!-- <b-form-input :textarea="true" :rows="19" v-model="json.self_introduction"></b-form-input> -->
                  <textarea class="form-control" rows="9" v-model="json.self_introduction"></textarea>
                </b-form-group>
                <!-- <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Password</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" autocomplete="current-password"></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i class="fa fa-asterisk"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>-->
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <!-- Customized -->
        <b-row v-if="type==2">
          <b-col>
            <b-card>
              <div slot="header">{{$t('Profile in JSON')}}</div>
              <b-form>
                <b-form-textarea
                  id="textarea2"
                  v-model="jsonStr"
                  placeholder="Enter in JSON format"
                  rows="15"
                />
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <div class="form-group form-actions">
          <b-button type="submit" variant="primary" @click="updateProfile">{{$t('Update')}}</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { setTimeout } from "timers";

export default {
  name: "simple",
  components: {},
  data: () => {
    return {
      json: { name: "" },
      jsonStr: "",
      type: 1
    };
  },
  created: function() {
    this.getProfile();
  },
  methods: {
    updateProfile: function() {
      let newStr = "";
      if (this.type == 1) {
        newStr = JSON.stringify(this.json);
      } else {
        newStr = this.jsonStr;
      }
      this.chain.updateProfile(newStr).then(res => {
        console.log(res);
        this.$message.success("txid : " + res.transaction_id);
        this.getProfile();
      });
    },
    getProfile: function() {
      let account = this.chain.getAccount();
      if (account) {
        this.chain.getProfile(account.name).then(userProfile => {
          this.jsonStr = userProfile;
          try {
            this.json = JSON.parse(userProfile);
          } catch (error) {
            this.$message.error(error);
          }
        });
      } else {
        let getProfile = this.getProfile;
        setTimeout(function() {
          getProfile();
        }, 2000);
      }
    },
    toSimple: function() {
      this.type = 1;
    },
    toCustomized: function() {
      this.type = 2;
    }
  }
};
</script>
