import Vue from 'vue'
import Vuex from 'vuex'

import chain from '../chain'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        account: {
            authority: "",
            blockchain: "",
            name: "",
        },
        candidates: [],
        members: []
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
        },
        removeAccount(state) {
            state.account = {
                authority: "",
                blockchain: "",
                name: "",
            }
        },
        addCandidates(state, list) {
            state.candidates = state.candidates.concat(list);
        },
        updateCandidate(state, { name: name, obj: obj }) {
            console.log(name, obj);
            for (let i = 0; i < state.candidates.length; i++) {
                if (state.candidates[i].name == name) {
                    state.candidates[i] = obj;
                }
            }
        },
        initCandidates(state) {
            state.candidates = [];
        },
        addMembers(state, list) {
            state.members = state.members.concat(list);
        },
        updateMember(state, { name: name, obj: obj }) {
            console.log(name, obj);
            for (let i = 0; i < state.members.length; i++) {
                if (state.members[i].name == name) {
                    state.members[i] = obj;
                }
            }
        },
        initMembers(state) {
            state.members = [];
        }
    },
    getters: {
        getCandidateByName: (state) => (name) => {
            return state.candidates.find(candidate => candidate.name === name)
        },
        getMemberByName: (state) => (name) => {
            return state.members.find(member => member.name === name)
        }
    },
    actions: {
        moreCandidates(context) {
            let length = context.state.candidates.length;
            let key = "";
            let nextFlag = false;//
            if (length > 0) {
                key = context.state.candidates[length - 1].name;
                nextFlag = true
            }
            chain.getCandidates(key, 100, nextFlag).then(res => {
                context.commit('addCandidates', res.rows);
            })
        },
        refreshCandidate(context, key) {
            chain.getCandidate(key).then(res => {
                console.log(res);
                context.commit('updateCandidate', { name: key, obj: res });
            })
        },
        moreMembers(context) {
            let length = context.state.members.length;
            let key = "";
            let nextFlag = false;//
            if (length > 0) {
                key = context.state.members[length - 1].name;
                nextFlag = true
            }
            chain.getMembers(key, 100, nextFlag).then(res => {
                console.log(res);
                context.commit('addMembers', res.rows);
            })
        }
    }
})