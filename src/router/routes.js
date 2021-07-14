// import layout components
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

// import common components
import TheError from "../components/common/The404.vue";

// import public components
import Home from "../views/PublicHome.vue";
import Login from "../views/TheLogin.vue";
import Register from "../views/TheRegister.vue";
import News from "../views/TheNews.vue";
import NewsDetails from "../components/publicPage/NewsDetails.vue";
import SideBar from "../components/SideBar.vue";
import SideBarDoctor from "../components/NavBarDoctor.vue";

//import auth components
import UserPage from "../views/UserHome.vue";

// import profile components
import UserProFile from "../components/pageUser/patient/profile/ProfileUser.vue";

// import record components
import RecordCase from "../components/pageUser/patient/record/RecordCase.vue";
import RecordMedical from "../components/pageUser/patient/record/RecordMedical.vue";

// import schedule components
import ScheduleMe from "../components/pageUser/patient/schedule/ScheduleMe.vue";
import ScheduleDoctor from "../components/pageUser/doctor/ScheduleDoctor.vue";
import ScheduleSet from "../components/pageUser/patient/schedule/ScheduleSet.vue";

// import Examination compnents
import Examination from "../components/pageUser/doctor/examination/Examination.vue";
import ThePatient from "../components/pageUser/doctor/examination/ThePatient.vue";
import TheRecord from "../components/pageUser/doctor/examination/TheRecord.vue";
import ThePrescription from "../components/pageUser/doctor/examination/ThePrescription.vue";

// import admin compnents
import TheAccount from "../components/pageUser/admin/TheAccount.vue";
import TheStatistical from "../components/pageUser/admin/TheStatistical.vue";
import TheAccountDoctor from "../components/pageUser/admin/TheAccountDoctor.vue";
import TheAccountPatient from "../components/pageUser/admin/TheAccountPatient.vue";
import TheAccountStaff from "../components/pageUser/admin/TheAccountStaff.vue";

// import staff compnents
import ResponseTemplate from "../components/pageUser/staff/chatbot/ResponseTemplate.vue";
import ResponseSuggestion from "../components/pageUser/staff/chatbot/ResponseSuggestion.vue";
import TheNews from "../components/pageUser/staff/TheNews.vue";
import TheDrug from "../components/pageUser/staff/Drugs/TheDrug.vue";
import ManageDrug from "../components/pageUser/staff/Drugs/ManageDrug.vue";
import TheService from "../components/pageUser/staff/TheService.vue";
import GroupDrug from "../components/pageUser/staff/Drugs/GroupDrug.vue";
import TheSchedule from "../components/pageUser/staff/schedule/TheSchedule.vue";
import ManageSchedule from "../components/pageUser/staff/schedule/ManageSchedule.vue";
import TheExperience from "../components/pageUser/staff/schedule/TheExperience.vue";
import TheBill from "../components/pageUser/staff/bill/TheBill.vue";
import TheShowService from "../components/pageUser/staff/bill/TheShowService.vue";
import TheUnPay from "../components/pageUser/staff/bill/TheUnPay.vue";
import ThePay from "../components/pageUser/staff/bill/ThePay.vue";

export const routes = [
  {
    path: "/page404",
    name: "ErrorPage",
    alias: "*",
    component: TheError,
  },
  {
    path: "/",
    name: "HomePage",
    components: {
      default: Home,
      TheHeader,
      TheFooter,
    },
  },
  {
    path: "/home",
    components: {
      default: Home,
      TheHeader,
      TheFooter,
    },
  },
  {
    path: "/news",
    name: "NewsPage",
    components: {
      default: News,
      TheHeader,
      TheFooter,
    },
    props: true,
    children: [],
  },
  {
    path: "/newsDetails",
    name: "NewsDetails",
    props: true,
    components: {
      default: NewsDetails,
      TheHeader,
      TheFooter,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    components: {
      default: Login,
      TheHeader,
    },
  },
  {
    path: "/register",
    name: "RegisterPage",
    components: {
      default: Register,
      TheHeader,
    },
  },
  // User
  {
    path: "/:userName",
    name: "UserPage",
    props: true,
    components: {
      default: UserPage,
      SideBar,
    },
    children: [
      // Patient
      {
        path: "/:userName/proFile",
        name: "userProfile",
        component: UserProFile,
      },
      {
        path: "/:userName/record/case",
        name: "RecordCase",
        component: RecordCase,
      },
      {
        path: "/:userName/record/medical",
        name: "RecordMedical",
        component: RecordMedical,
      },
      {
        path: "/:userName/schedule/case",
        name: "ScheduleMe",
        component: ScheduleMe,
      },
      {
        path: "/:userName/schedule/doctor",
        name: "ScheduleDoctor",
        component: ScheduleDoctor,
      },
      {
        path: "/:userName/schedule/medical",
        name: "ScheduleSet",
        component: ScheduleSet,
      },
      // Doctor
      {
        path: "/:userName/examination",
        name: "Examination",
        components: {
          default: Examination,
          SideBarDoctor,
        },
        children: [
          {
            path: "/:userName/examination/patient",
            name: "ThePatient",
            component: ThePatient,
          },
          {
            path: "/:userName/examination/record",
            name: "TheRecord",
            component: TheRecord,
          },
          {
            path: "/:userName/examination/prescription",
            name: "ThePrescription",
            component: ThePrescription,
          },
        ],
      },
      // Admin
      {
        path: "/:userName/account",
        name: "Account",
        component: TheAccount,
        children: [
          {
            path: "/:userName/account/doctor",
            name: "AccountDoctor",
            component: TheAccountDoctor,
          },
          {
            path: "/:userName/account/patient",
            name: "AccountPatient",
            component: TheAccountPatient,
          },
          {
            path: "/:userName/account/staff",
            name: "AccountStaff",
            component: TheAccountStaff,
          },
        ],
      },
      {
        path: "/:userName/statistical",
        name: "Statistical",
        component: TheStatistical,
        children: [
          // {
          //   path: "/:userName/examination/patient",
          //   name: "ThePatient",
          //   component: ThePatient,
          // },
        ],
      },

      // Staff
      {
        path: "/:userName/chatbot/template",
        name: "ResponseTemplate",
        component: ResponseTemplate,
      },
      {
        path: "/:userName/chatbot/suggestion",
        name: "ResponseSuggestion",
        component: ResponseSuggestion,
      },
      {
        path: "/:userName/news",
        name: "News",
        component: TheNews,
      },
      {
        path: "/:userName/service",
        name: "Service",
        component: TheService,
      },
      {
        path: "/:userName/drugs",
        name: "Drugs",
        component: TheDrug,
        children: [
          {
            path: "/:userName/drugs/groups",
            name: "GroupDrug",
            component: GroupDrug,
          },
          {
            path: "/:userName/drugs/listDrugs",
            name: "ManageDrug",
            component: ManageDrug,
          },
        ],
      },
      {
        path: "/:userName/listSchedule",
        name: "Schedule",
        component: TheSchedule,
        children: [
          {
            path: "/:userName/listSchedule/manage",
            name: "ManageSchedules",
            component: ManageSchedule,
          },
          {
            path: "/:userName/listSchedule/approve",
            name: "Experience",
            component: TheExperience,
          },
        ],
      },
      {
        path: "/:userName/bills",
        name: "Bill",
        component: TheBill,
        children: [
          {
            path: "/:userName/bills/pay",
            name: "Pay",
            component: ThePay,
          },
          {
            path: "/:userName/bills/unPay",
            name: "UnPay",
            component: TheUnPay,
          },
          {
            path: "/:userName/bills/serviceStatus",
            name: "ShowService",
            component: TheShowService,
          },
        ],
      },
    ],
  },
];
