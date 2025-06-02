module.exports = {
  async pay(ctx) {
    // Ambil parameter dari body (misal amount, method, dll)
    const { amount } = ctx.request.body;

    // Simulasi proses pembayaran
    if (!amount || amount <= 0) {
      return ctx.badRequest('Invalid amount');
    }

    // Dummy logic: jika amount > 1000 gagal bayar, selainnya sukses
    if (amount > 1000) {
      return ctx.send({ status: 'failed', message: 'Payment failed due to amount limit' });
    }

    // Kalau sukses
    return ctx.send({ status: 'success', message: 'Payment successful', amount });
  },
};
