// import type { GlobalThemeOverrides } from 'naive-ui';

// export const lightThemeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#1877a0',
//     primaryColorHover: '#1e81a5',
//     primaryColorPressed: '#227ba8',
//     primaryColorSuppl: '#0f1824',
//   },
//   Menu: {
//     itemHeight: '32px',
//   },

//   Layout: { color: '#f1f5f9' },

//   AutoComplete: {
//     peers: {
//       InternalSelectMenu: { height: '500px' },
//     },
//   },
// };

// export const darkThemeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#1877a0',
//     primaryColorHover: '#1e81a5',
//     primaryColorPressed: '#227ba8',
//     primaryColorSuppl: '#0f1824',
//   },

//   Notification: {
//     color: '#333333',
//   },

//   AutoComplete: {
//     peers: {
//       InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
//     },
//   },

//   Menu: {
//     itemHeight: '32px',
//   },

//   Layout: {
//     color: '#1c1c1c',
//     siderColor: '#232323',
//     siderBorderColor: 'transparent',
//   },

//   Card: {
//     color: '#232323',
//     borderColor: '#282828',
//   },

//   Table: {
//     tdColor: '#232323',
//     thColor: '#353535',
//   },
// };

// import type { GlobalThemeOverrides } from 'naive-ui';

// export const lightThemeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#1877a0',
//     primaryColorHover: '#1e81a5',
//     primaryColorPressed: '#227ba8',
//     primaryColorSuppl: '#0f1824',
//     bodyColor: 'rgba(255,255,255,0)', // Biar body transparan
//   },
//   Menu: {
//     itemHeight: '32px',
//   },

//   Layout: {
//     color: 'rgba(255,255,255,0)',         // Ganti dari solid ke transparent
//     contentColor: 'rgba(255,255,255,0)',  // Supaya isi layout juga transparan
//     headerColor: 'rgba(255,255,255,0)',
//     siderColor: 'rgba(255,255,255,0)',
//     footerColor: 'rgba(255,255,255,0)',
//   },

//   AutoComplete: {
//     peers: {
//       InternalSelectMenu: { height: '500px' },
//     },
//   },
// };

// export const darkThemeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#1877a0',
//     primaryColorHover: '#1e81a5',
//     primaryColorPressed: '#227ba8',
//     primaryColorSuppl: '#0f1824',
//     bodyColor: 'rgba(0,0,0,0)', // Supaya body transparan
//   },

//   Notification: {
//     color: '#333333',
//   },

//   AutoComplete: {
//     peers: {
//       InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
//     },
//   },

//   Menu: {
//     itemHeight: '32px',
//   },

//   Layout: {
//     color: 'rgba(0,0,0,0)',        // Ganti dari solid ke transparent
//     contentColor: 'rgba(0,0,0,0)',
//     headerColor: 'rgba(0,0,0,0)',
//     siderColor: 'rgba(0,0,0,0)',
//     footerColor: 'rgba(0,0,0,0)',
//     siderBorderColor: 'transparent',
//   },

//   Card: {
//     color: '#232323',
//     borderColor: '#282828',
//   },

//   Table: {
//     tdColor: '#232323',
//     thColor: '#353535',
//   },
// };

import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1877a0',
    primaryColorHover: '#1e81a5',
    primaryColorPressed: '#227ba8',
    primaryColorSuppl: '#0f1824',
    bodyColor: 'rgba(255,255,255,0)',
  },
  Card: {
    color: 'rgba(20,32,48,0.82)',
    borderColor: 'rgba(255,255,255,0.25)',
    titleTextColor: '#fff',
    textColor: 'rgba(255,255,255,0.97)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.19)',
  },
  Menu: {
    color: 'rgba(20,32,48,0.84)',
    itemColorActive: 'rgba(60,170,240,0.17)',
    itemTextColor: '#fff',
    itemTextColorActive: '#fff',
    borderRadius: '12px',
    itemIconColorActive: '#fff',
  },
  Layout: {
    color: 'rgba(255,255,255,0)',
    contentColor: 'rgba(255,255,255,0)',
    headerColor: 'rgba(255,255,255,0)',
    siderColor: 'rgba(20,32,48,0.84)',
    footerColor: 'rgba(255,255,255,0)',
    siderBorderColor: 'transparent',
  },
  Tooltip: {
    color: 'rgba(36,53,78,0.97)',
    textColor: '#fff',
    borderRadius: '8px',
  },
  Table: {
    thColor: 'rgba(36,53,78,0.88)',
    tdColor: 'rgba(36,53,78,0.72)',
    borderColor: 'rgba(255,255,255,0.10)',
    color: 'rgba(20,32,48,0.82)',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1877a0',
    primaryColorHover: '#1e81a5',
    primaryColorPressed: '#227ba8',
    primaryColorSuppl: '#0f1824',
    bodyColor: 'rgba(0,0,0,0)',
  },
  Card: {
    color: 'rgba(20,32,48,0.85)',
    borderColor: 'rgba(255,255,255,0.21)',
    titleTextColor: '#fff',
    textColor: 'rgba(255,255,255,0.98)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(21,34,56,0.22)',
  },
  Menu: {
    color: 'rgba(20,32,48,0.89)',
    itemColorActive: 'rgba(60,170,240,0.23)',
    itemTextColor: '#fff',
    itemTextColorActive: '#fff',
    borderRadius: '12px',
    itemIconColorActive: '#fff',
  },
  Layout: {
    color: 'rgba(0,0,0,0)',
    contentColor: 'rgba(0,0,0,0)',
    headerColor: 'rgba(0,0,0,0)',
    siderColor: 'rgba(20,32,48,0.87)',
    footerColor: 'rgba(0,0,0,0)',
    siderBorderColor: 'transparent',
  },
  Tooltip: {
    color: 'rgba(36,53,78,0.97)',
    textColor: '#fff',
    borderRadius: '8px',
  },
  Table: {
    thColor: 'rgba(36,53,78,0.93)',
    tdColor: 'rgba(36,53,78,0.77)',
    borderColor: 'rgba(255,255,255,0.13)',
    color: 'rgba(20,32,48,0.87)',
  },
  Notification: { color: '#333333' },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },
};
