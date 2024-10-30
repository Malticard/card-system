export interface MenuItem {
  path?: string;
  icon?: string;
  type?: string;
  badge?: string;
  Names?: string;
  badgetxt?: string;
  badge1?: boolean;
  background?: string;
  active?: boolean;
  selected?: boolean;
  title?: string;
  menutitle?: string;
  Items?: (MenuItem | NestedMenuItem)[];
  children?: Array<any>
}

export interface NestedMenuItem extends MenuItem {
  children: (MenuItem | NestedMenuItem)[];
}


export const MENUITEMS: (MenuItem | NestedMenuItem)[] = [
  {
    menutitle: "DASHBOARD",
    Items: [
      {
        path: "/dashboard",
        icon: "ti-pie-chart",
        type: "link",
        active: true,
        selected: true,
        title: "Dashboard",
      },
      {
        path: "/dashboard/clients",
        icon: "ti-user",
        type: "link",
        active: false,
        selected: false,
        title: "Clients",
      }, {
        path: "/dashboard/users",
        icon: "ti-user",
        type: "link",
        active: false,
        selected: false,
        title: "Users",
      },

    ],
  },

];

export const Finance: (MenuItem | NestedMenuItem)[] = [
  {
    menutitle: "DASHBOARD",
    Items: [
      {
        path: "/dashboard",
        icon: "ti-pie-chart",
        type: "link",
        active: true,
        selected: true,
        title: "Dashboard",
      },
    ]
  },
  {
    menutitle: "MONITORING SECTION",
    Items: [
      {
        path: "/dashboard/PendingOvertime",
        icon: "ti-timer",
        type: "link",
        active: false,
        selected: false,
        title: "Pending Overtime",
      }, {
        path: "/dashboard/ClearedOvertime",
        icon: "ti-timer",
        type: "link",
        active: false,
        selected: false,
        title: "Cleared Overtime",
      }, {
        path: "/dashboard/Payments",
        icon: "ti-timer",
        type: "link",
        active: false,
        selected: false,
        title: "Payments",
      },
    ],
  },
  {
    menutitle: "SETTINGS SECTION",
    Items: [
      {
        path: "/dashboard/ChangePassword",
        icon: " ti-lock",
        type: "link",
        active: false,
        selected: false,
        title: "Change Password",
      },
    ],
  }
];