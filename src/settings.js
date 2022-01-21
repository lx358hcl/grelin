//Importer watchern og ref
import { ref } from "vue";

//Settings
var settings = ref({
    "page": "home",
    "sorting": "new",
    "sortingDate": "today",
    "notifications": {},
    "unreadMessages": 10,
    "points": null,
    "user": false,
    "userData": false,
    "ready": false,
    "websiteinfo": false,
    "posts":{},
    "comments":{},
    "usercontent": {},
});

//Export them
export default settings;