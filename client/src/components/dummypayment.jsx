import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DummyPayment() {
  const location = useLocation();
  const { state } = location || {};
  const { values, cart } = state || {};

  // Hitung total amount dari cart
  const totalAmount = cart ? cart.reduce((sum, item) => sum + (item.attributes.price * item.count), 0) : 0;

  const [amount, setAmount] = useState(totalAmount.toFixed(2));
  const [result, setResult] = useState(null);

  const handlePay = async () => {
    if (!amount) {
      alert('Masukkan jumlah pembayaran');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/payment/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(amount), contactInfo: values }),
      });

      if (!response.ok) {
        throw new Error('Request Failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error saat pembayaran');
    }
  };

  return (
    <div>
      <h2>Dummy Payment</h2>
      {values && (
        <div>
          <p>Nama: {values.billingAddress.firstName} {values.billingAddress.lastName}</p>
          <p>Email: {values.email}</p>
          <p>Telepon: {values.phoneNumber}</p>
        </div>
      )}
      <input
        type="number"
        placeholder="Jumlah pembayaran"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handlePay}>Bayar</button>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <p>Pesan: {result.message}</p>
          {result.amount && <p>Jumlah: {result.amount}</p>}
        </div>
      )}
    </div>
  );
}
