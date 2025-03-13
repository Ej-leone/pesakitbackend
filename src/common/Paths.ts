
export default {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login : '/login',
    Register : '/register',
  },
  Products: {
    Base: '/shop',
    Get: '/products',
    Getone:  '/product/:id',
  },
  Cart: {
    add: '/cart',
    get: '/cart',
    updateItem:'/cart/:id',
    deleteItem: '/cart/:id',
    checkout:  '/checkout',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
