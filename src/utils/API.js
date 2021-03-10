import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    // get users from the Random User API
    getFromAPI: function(number) {
        return axios.get("https://randomuser.me/api/?results=" + number + "&format=json&inc=name,email,phone,id&nat=us&format=prettyjson");
    }
};