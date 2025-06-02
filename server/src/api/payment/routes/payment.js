module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/payment/pay',
      handler: 'payment.pay',
      config: {
        auth: false, // sesuaikan kalau pakai auth
      },
    },
  ],
};
