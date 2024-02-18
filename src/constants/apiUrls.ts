export const apiUrls = {
  root: '/',
  audit: '/audit',
  home: '/home',
  auth: {
    signup: '/auth/signup',
    signin: '/auth/signin'
  },
  medicine: {
    root: '/medicine',
    expired: '/medicine/expired',
    bulkUpdate: '/medicine/bulk-update',
    withId: (id: number) => `/medicine/${id}`
  },
  category: {
    root: '/category',
    withId: (id: number) => `/category/${id}`
  },
  constantlyStoredMedicine: {
    root: '/constantly-stored-medicine',
    missing: '/constantly-stored-medicine/missing',
    withId: (id: number) => `/constantly-stored-medicine/${id}`
  }
};

export const authorizedPaths = [ '/login', '/register' ];

export const navigationLinks = [
  {
    name: 'Medicine',
    link: apiUrls.root
  },
  {
    name: 'Category',
    link: apiUrls.category.root
  },
  {
    name: 'Audit',
    link: apiUrls.audit
  }
];
