import moment from "moment";
const TABLE_COLUMNS = {
  APPOINTMENT_SCHEDULE_COLUMNS: [
    {
      key: "fullNameInfor",
      label: "Doctor name",
      sortable: true,
    },
    {
      key: "selectDate",
      label: "Date",
    },
    {
      key: "selectTime",
      label: "Time frame",
    },
    // {
    //   key: "status",
    //   label: "Status",
    // },
    {
      key: "setSchudule",
      label: "action",
    },
  ],
  CASE_HISTORY_COLUMNS: [
    {
      key: "diagnostic",
      label: "Diagnostic",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].diagnostic;
      },
    },
    {
      key: "fullName",
      label: "Doctor",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].doctorDMR.fullName;
      },
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(item.updateDate).format("MM/DD/YYYY");
      },
    },
    {
      key: "showCase",
      label: "action",
    },
  ],
  MEDICAL_HISTORY_COLUMNS: [
    {
      key: "title",
      label: "Name",
      sortable: true,
    },
    {
      key: "yearOfIllness",
      label: "Year",
      sortable: true,
      formatter: (value, key, item) => {
        return value + " Year";
      },
    },
  ],
  PATIENT_COLUMNS: [
    {
      key: "userName",
      label: "ID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Name",
      sortable: true,
    },
    {
      key: "gender",
      label: "Gender",
      formatter: (value, key, item) => {
        return value ? "FeMale" : "Male";
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "patientAction",
      label: "Action",
    },
  ],
  PATIENT_RECORD_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Doctor",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Day Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "title",
      label: "Topic",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      formatter: (value, key, item) => {
        return item.patientMR.fullName;
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      formatter: (value, key, item) => {
        return item.detailMRs[0].phoneNumber;
      },
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].age;
      },
    },
    {
      key: "actionRecord",
      label: "Action",
    },
  ],
  PATIENT_PRESCRIPTION_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Doctor",
      sortable: true,
    },
    {
      key: "diagnostic",
      label: "Diagnostic",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].diagnostic;
      },
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      formatter: (value, key, item) => {
        return item.patientMR.fullName;
      },
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].age;
      },
    },
    {
      key: "createdAt",
      label: "Day Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "actionRecord",
      label: "Action",
    },
  ],
  PATIENT_DETAILS_PRESCRIPTION_COLUMNS: [
    {
      key: "id",
      label: "DrugID",
      sortable: true,
      formatter: (value, key, item) => {
        return item.drug.id;
      },
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      formatter: (value, key, item) => {
        return item.drug.name;
      },
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
    },
    {
      key: "unit",
      label: "Unit",
      sortable: true,
      formatter: (value, key, item) => {
        return item.drug.unit;
      },
    },
    {
      key: "advice",
      label: "Advice",
    },
  ],
  PATIENT_DETAILS_SERVICE_COLUMNS: [
    {
      key: "id",
      label: "ServiceID",
      sortable: true,
    },
    {
      key: "name",
      label: "Service",
    },
    {
      key: "fees",
      label: "Fees",
      formatter: (value, key, item) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencySign: "accounting",
        }).format(value);
      },
    },
  ],
  STAFF_DETAILS_SERVICE_COLUMNS: [
    {
      key: "serviceId",
      label: "ServiceID",
      sortable: true,
    },
    {
      key: "serviceName",
      label: "Service",
    },
    {
      key: "fees",
      label: "Fees",
      formatter: (value, key, item) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencySign: "accounting",
        }).format(value);
      },
    },
  ],
  PATIENT_SERVICE_PRESCRIPTION_COLUMNS: [
    {
      key: "id",
      label: "ServiceID",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "fees",
      label: "Fees",
      sortable: true,
    },
    {
      key: "descriptionService",
      label: "Description",
    },
    {
      key: "imageService",
      label: "Image",
    },
  ],
  PATIENT_BILL_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
  ],
  // Chua lam xong patient
  HISTORY_PATIENT_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
  ],

  // Staff table
  TEMPLATE_RESPONSE_COLUMNS: [
    {
      key: "query",
      label: "Message",
      sortable: true,
    },
    {
      key: "answer",
      label: "Answer",
    },
    {
      key: "action_temp",
      label: "Action",
    },
  ],
  RESPONSE_SUGGESTIONS_COLUMNS: [
    {
      key: "created_at",
      label: "Date",
      sortable: true,
    },
    {
      key: "query",
      label: "Query",
    },
    {
      key: "zalo_id",
      label: "Zalo ID",
    },
    {
      key: "action_temp",
      label: "Action",
    },
  ],
  STAFF_SERVICE_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Date Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "fees",
      label: "Fees",
      sortable: true,
    },
    {
      key: "action_service",
      label: "Action",
    },
  ],
  STAFF_RECORD_SERVICE_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "patientName",
      label: "Full Name",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].patientName;
      },
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].age;
      },
    },
    {
      key: "createdBy",
      label: "CreatedBy",
      sortable: true,
      formatter: (value, key, item) => {
        return item.detailMRs[0].createdBy;
      },
    },
    {
      key: "createdAt",
      label: "Date Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(item.detailMRs[0].createdAt).format("DD-MMM-YYYY");
      },
    },
    {
      key: "createBill",
      label: "Action",
    },
  ],
  STAFF_RESULT_SERVICE_COLUMNS: [
    {
      key: "id",
      label: "ServiceID",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "fees",
      label: "Fees",
      sortable: true,
      formatter: (value, key, item) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencySign: "accounting",
        }).format(value);
      },
    },
  ],
  STAFF_PAY_COLUMNS: [
    {
      key: "billId",
      label: "Id",
      sortable: true,
    },
    {
      key: "patientName",
      label: "Full Name",
      sortable: true,
    },
    {
      key: "healthInsurance",
      label: "Health Insurance",
    },
    {
      key: "createAt",
      label: "Date",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      key: "statusPayment",
      label: "Payment",
    },
  ],
  STAFF_UN_PAY_COLUMNS: [
    {
      key: "billId",
      label: "Id",
      sortable: true,
    },
    {
      key: "patientName",
      label: "Full Name",
      sortable: true,
    },
    {
      key: "healthInsurance",
      label: "Health Insurance",
    },
    {
      key: "createAt",
      label: "Date",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      key: "statusUnPayment",
      label: "Payment",
    },
  ],
  STAFF_DRUGS_COLUMNS: [
    {
      key: "id",
      label: "DrugId",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Create",
      sortable: true,
    },
    {
      key: "name",
      label: "Drugs Name",
    },
    {
      key: "unit",
      label: "Unit",
    },
    {
      key: "actionDrugs",
      label: "Action",
    },
  ],
  STAFF_GROUP_DRUGS_COLUMNS: [
    {
      key: "id",
      label: "GroupId",
      sortable: true,
    },
    {
      key: "name",
      label: "Group Name",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      key: "groupDrugs",
      label: "Action",
    },
  ],
  STAFF_GROUP_DETAIL_DRUGS_COLUMNS: [
    {
      key: "id",
      label: "DrugId",
      sortable: true,
    },
    {
      key: "name",
      label: "Drugs Name",
      sortable: true,
    },
    {
      key: "unit",
      label: "Unit",
    },
    {
      key: "ingredient",
      label: "Ingredient",
    },
    {
      key: "createdAt",
      label: "Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
  ],
  STAFF_NEWS_COLUMNS: [
    {
      key: "id",
      label: "NewsID",
      sortable: true,
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "createdBy",
      label: "CreatedBy",
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      key: "newsAction",
      label: "Action",
    },
  ],
  STAFF_SCHEDULE_COLUMNS: [
    {
      key: "patientId",
      label: "ID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
    },
    {
      key: "gender",
      label: "Gender",
      formatter: (value, key, item) => {
        return value ? "FeMale" : "Male";
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "action_schedule",
      label: "Action",
    },
  ],
  STAFF_DETAILS_SCHEDULE_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Doctor",
      formatter: (value, key, item) => {
        return item.doctor.fullName;
      },
    },
    {
      key: "titleCalendar",
      label: "Title",
      sortable: true,
    },
    {
      key: "startTime",
      label: "Start",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY HH a");
      },
    },
    {
      key: "endTime",
      label: "End",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY HH a");
      },
    },
    {
      key: "status",
      label: "Status",
      formatter: (value, key, item) => {
        return value;
      },
    },
    {
      key: "action_schedule_details",
      label: "Action",
    },
  ],
  STAFF_APPROVE_SCHEDULE_COLUMNS: [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "userName",
      label: "DoctorID",
      sortable: true,
      formatter: (value, key, item) => {
        return item.doctor.userName;
      },
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      formatter: (value, key, item) => {
        return item.patient.fullName;
      },
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      key: "startTime",
      label: "Start",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY HH a");
      },
    },
    {
      key: "endTime",
      label: "End",
      formatter: (value, key, item) => {
        return moment(value).format("DD-MM-YYYY HH a");
      },
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action_approve",
      label: "Action",
    },
  ],
  // Admin
  ACCOUNT_DOCTOR_COLUMNS: [
    {
      key: "userName",
      label: "DoctorID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Full Name",
    },
    {
      key: "gender",
      label: "Gender",
      formatter: (value, key, item) => {
        return item.gender ? "FeMale" : "Male";
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "specialized",
      label: "Specialized",
    },
    {
      key: "createdAt",
      label: "Day Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "accountDoctor",
      label: "Action",
    },
  ],
  ACCOUNT_STAFF_COLUMNS: [
    {
      key: "userName",
      label: "StaffID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Full Name",
    },
    {
      key: "gender",
      label: "Gender",
      formatter: (value, key, item) => {
        return item.gender ? "FeMale" : "Male";
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "createdAt",
      label: "Day Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "accountStaff",
      label: "Action",
    },
  ],
  ACCOUNT_PATIENT_COLUMNS: [
    {
      key: "userName",
      label: "PatientID",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Full Name",
    },
    {
      key: "gender",
      label: "Gender",
      formatter: (value, key, item) => {
        return item.gender ? "FeMale" : "Male";
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "createdAt",
      label: "Day Create",
      sortable: true,
      formatter: (value, key, item) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      key: "accountPatient",
      label: "Action",
    },
  ],
};

export default TABLE_COLUMNS;
