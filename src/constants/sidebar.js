const SIDEBAR = {
  menuPatient: [
    {
      href: {
        name: "userProfile",
      },
      title: "Profile",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user",
        },
      },
    },
    {
      title: "Record",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "notes-medical",
        },
      },
      child: [
        {
          href: {
            name: "RecordCase",
          },
          title: "Clinical Record",
        },
        {
          href: {
            name: "RecordMedical",
          },
          title: "Medical History",
        },
      ],
    },
    {
      title: "Schedule",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "calendar-check",
        },
      },
      child: [
        {
          href: {
            name: "ScheduleMe",
          },
          title: "My Schedule",
        },
        {
          href: {
            name: "ScheduleSet",
          },
          title: "Set Schedule",
        },
      ],
    },
  ],
  // Staff menuStaff
  menuStaff: [
    {
      href: {
        name: "userProfile",
      },
      title: "Profile",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user",
        },
      },
    },
    {
      href: {
        name: "News",
      },
      title: "News",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "newspaper",
        },
      },
    },
    {
      href: {
        name: "AccountPatient",
      },
      title: "Patient",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user-injured",
        },
      },
    },
    {
      href: {
        name: "Service",
      },
      title: "Service",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "cogs",
        },
      },
    },
    {
      title: "ChatBot",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "comments",
        },
      },
      child: [
        {
          href: {
            name: "ResponseTemplate",
          },
          title: "Response Templates",
        },
        {
          href: {
            name: "ResponseSuggestion",
          },
          title: "Answer Suggestions",
        },
      ],
    },
    {
      title: "Bill",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "money-bill",
        },
      },
      child: [
        {
          href: {
            name: "ShowService",
          },
          title: "Payment",
        },
        {
          href: {
            name: "Pay",
          },
          title: "Bill",
        },
      ],
    },
    {
      title: "Schedule",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "calendar-plus",
        },
      },
      child: [
        {
          href: {
            name: "ManageSchedules",
          },
          title: "Manage Schedule",
        },
        {
          href: {
            name: "Experience",
          },
          title: "Approve",
        },
      ],
    },
    {
      title: "Drug",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "pills",
        },
      },
      child: [
        {
          href: {
            name: "GroupDrug",
          },
          title: "Groups Drug",
        },
        {
          href: {
            name: "ManageDrug",
          },
          title: "Manage Drug",
        },
      ],
    },
  ],
  // Doctor
  menuDoctor: [
    {
      title: "Profile",
      href: {
        name: "userProfile",
      },
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user",
        },
      },
    },
    {
      title: "Schedule",
      href: {
        name: "ScheduleDoctor",
      },
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "calendar-check",
        },
      },
    },
    {
      title: "Examination",
      href: {
        name: "ThePatient",
      },
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "procedures",
        },
      },
    },
  ],
  // Admin
  menuAdmin: [
    {
      href: {
        name: "userProfile",
      },
      title: "Profile",
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user",
        },
      },
    },
    {
      title: "Account",
      href: {
        name: "AccountDoctor",
      },
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "user-circle",
        },
      },
    },
    {
      title: "Statistical",
      href: {
        name: "Statistical",
      },
      icon: {
        element: "font-awesome-icon",
        attributes: {
          icon: "chart-line",
        },
      },
    },
  ],
};

export default SIDEBAR;
