import Enu from "enujs";
import bigInt from "big-integer";


//chain const
const httpEndpoint = "https://debug.qsx.io";
const host = "enu.qsx.io";
const chainId =
    "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";

const httpNetwork = {
    host: host,
    blockchain: "enu",
    chainId: chainId,
    port: 443,
    protocol: "https"
};

const eosOptions = {
    broadcast: true,
    sign: true,
    chainId: chainId
};

/* const txOptions = {
    broadcast: true,
    sign: true
}; */

const pluginName = "ironman";


//contract info
const profileContract = "userprofiles";
const ubiContract = "ubicandidate";

var enu = Enu({
    httpEndpoint: httpEndpoint,
    chainId: chainId
});

var globalAccount;


function char_to_symbol(c) {
    if (c >= 'a' && c <= 'z')
        return c.charCodeAt(0) - 97 + 6;
    //return 1 * (c - 'a') + 6;
    if (c >= '1' && c <= '5')
        //return 1 * (c - '1') + 1;
        return 1 * c;
    return 0;
}

// Each char of the string is encoded into 5-bit chunk and left-shifted
// to its 5-bit slot starting with the highest slot for the first char.
// The 13th char, if str is long enough, is encoded into 4-bit chunk
// and placed in the lowest 4 bits. 64 = 12 * 5 + 4
function string_to_name(name_str) {
    let str = name_str.split("");
    let name = bigInt(0);
    let value = bigInt(0);
    let i = 0;
    for (; str[i] && i < 12; ++i) {
        // NOTE: char_to_symbol() returns char type, and without this explicit
        // expansion to uint64 type, the compilation fails at the point of usage
        // of string_to_name(), where the usage requires constant (compile time) expression.
        value = bigInt(char_to_symbol(str[i]) & 0x1f).shiftLeft((64 - 5 * (i + 1)));
        name = name.or(value);
    }

    // The for-loop encoded up to 60 high bits into uint64 'name' variable,
    // if (strlen(str) > 12) then encode str[12] into the low (remaining)
    // 4 bits of 'name'
    /* if (i == 12)
        name |= char_to_symbol(str[12]) & 0x0F; */
    return name;
}

export default {
    setAccount: function (user) {
        globalAccount = user;
    },
    getAccount: function () {
        return globalAccount;
    },
    //get user profile
    getProfile: function (name) {
        return enu
            .getTableRows({
                scope: profileContract,
                code: profileContract,
                table: "userprofiles",
                lower_bound: name,
                json: true
            })
            .then(result => {
                let row = result.rows[0];
                if (row && name == row.owner) {
                    //console.log(row);
                    return row.json;
                } else {
                    return "";
                }
            });
    },
    getGlobal: function (name) {
        return enu
            .getTableRows({
                scope: ubiContract,
                code: ubiContract,
                table: "global",
                lower_bound: name,
                json: true
            })
            .then(result => {
                console.log(result);
                return result.rows[0];
            });
    },
    getCandidate: function (name) {
        return enu
            .getTableRows({
                scope: ubiContract,
                code: ubiContract,
                table: "candidate",
                lower_bound: name,
                json: true
            })
            .then(result => {
                console.log(result);
                let row = result.rows[0];
                if (row && name == row.name) {
                    return row;
                } else {
                    return null;
                }
            });
    },
    getCandidates: function (key, limit, nextFlag) {
        let lower_bound = key;
        if (nextFlag) {
            // convert key from string to uint_64
            let lower_value = string_to_name(key).add(1);
            lower_bound = lower_value.toString(10);
        }
        return enu
            .getTableRows({
                scope: ubiContract,
                code: ubiContract,
                table: "candidate",
                lower_bound: lower_bound,
                json: true,
                limit: limit
            })
            .then(result => {
                return result;
            });
    },
    getMember: function (name) {
        return enu
            .getTableRows({
                scope: ubiContract,
                code: ubiContract,
                table: "member",
                lower_bound: name,
                json: true
            })
            .then(result => {
                console.log(result);
                let row = result.rows[0];
                if (row && name == row.name) {
                    return row;
                } else {
                    return null;
                }
            });
    },
    getMembers: function (key, limit, nextFlag) {
        let lower_bound = key;
        if (nextFlag) {
            // convert key from string to uint_64
            let lower_value = string_to_name(key).add(1);
            lower_bound = lower_value.toString(10);
        }
        return enu
            .getTableRows({
                scope: ubiContract,
                code: ubiContract,
                table: "member",
                lower_bound: lower_bound,
                json: true,
                limit: limit
            })
            .then(result => {
                return result;
            });
    },
    getVoteRecords: function (key/*, limit, nextFlag */) {
        /* let lower_bound = key;
        if (nextFlag) {
            // convert key from string to uint_64
            let lower_value = string_to_name(key).add(1);
            lower_bound = lower_value.toString(10);
        } */
        return enu
            .getTableRows({
                "scope": ubiContract,
                "code": ubiContract,
                "table": "vote",
                "json": true,
                "limit": 100,
                "lower_bound": key,
                "upper_bound": key,
                "key_type": "name",
                "index_position": "2"
            })
            .then(result => {
                return result;
            });
    },
    //连接插件
    connectIdentity() {
        return new Promise((resolve, reject) => {
            if (window[pluginName]) {
                window[pluginName]
                    .getIdentity({ accounts: [httpNetwork] })
                    .then(identity => {
                        let account = identity.accounts[0];
                        //this.accountName = account_name;
                        globalAccount = account;
                        resolve(account);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            } else {
                setTimeout(() => {
                    this.connectIdentity()
                        .then(account => {
                            resolve(account);
                        })
                        .catch(error => {
                            reject(error);
                        });
                }, 2000);
            }
        });
    },
    //切换插件用户
    changeIdentity() {
        return new Promise((resolve, reject) => {
            if (window[pluginName]) {
                return window[pluginName].forgetIdentity().then(() => {
                    resolve();
                });
            } else {
                reject("ironman not loaded!");
            }
        });
    },
    //send update tx
    updateProfile(jsonString) {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: profileContract,
                name: "set",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { owner: globalAccount.name, json: jsonString }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    },
    apply() {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: ubiContract,
                name: "apply",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { user: globalAccount.name }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    },
    vote(candidate, opinion, comment) {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: ubiContract,
                name: "vote",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { voter: globalAccount.name, candidate: candidate, opinion: opinion, vote_comment: comment }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    },
    add(user) {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: ubiContract,
                name: "add",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { user: user }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    },
    activate() {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: ubiContract,
                name: "activate",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { user: globalAccount.name }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    },
    claim() {
        let plugin = window[pluginName].enu(httpNetwork, Enu, eosOptions, "https");
        let tx_data = {
            actions: [{
                account: ubiContract,
                name: "claim",
                authorization: [{ actor: globalAccount.name, permission: globalAccount.authority }],
                data: { user: globalAccount.name }
            }]
        };

        return this.connectIdentity().then(() => {
            return plugin.transaction(tx_data);
        });
    }
};