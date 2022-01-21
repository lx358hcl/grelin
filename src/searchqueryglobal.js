//Importer watchern og ref
import { ref } from "vue";

//Settings
var searchqueryglobal = ref({
    "searchquery":"",
    "current_page": 0,
    "results": [],
});

export default searchqueryglobal;