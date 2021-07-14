import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { scheduleContent } from "./modules/schedule-content";
import { recordContent } from "./modules/record-content";
import { calendarContent } from "./modules/calendar-content";
import { profile } from "./modules/profile";
import { patientContent } from "./modules/patient-content";
import { responseTemplate } from "./modules/response-template";
import { responseSuggestion } from "./modules/response-suggestion";
import { drugContent } from "./modules/drug-content";
import { serviceContent } from "./modules/service-content";
import { accountContent } from "./modules/account-content";
import { statisticalContent } from "./modules/statistical-content";
import { billContent } from "./modules/bill-content";
import { newsContent } from "./modules/news-content";
import { alert } from "./modules/alert";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    scheduleContent,
    recordContent,
    calendarContent,
    profile,
    patientContent,
    responseTemplate,
    responseSuggestion,
    drugContent,
    serviceContent,
    newsContent,
    accountContent,
    statisticalContent,
    billContent,
    alert
  },
});
