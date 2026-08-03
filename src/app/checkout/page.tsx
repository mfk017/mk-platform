'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[32px]">check</span>
        </div>
        <h1 className="font-headline-lg text-primary mb-2">Payment Successful!</h1>
        <p className="font-body-md text-on-surface-variant mb-8 text-center max-w-md">
          Your booking has been confirmed. You will receive an email shortly with your session details.
        </p>
        <Link href="/hub" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-sm hover:bg-primary/90 transition-colors">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/hub" className="text-secondary hover:text-secondary-container flex items-center gap-2 mb-4 font-label-sm w-fit transition-colors group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Hub
          </Link>
          <h1 className="font-headline-lg text-primary">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-lg">
              <h2 className="font-title-md text-on-surface mb-4">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=200&q=80')" }}></div>
                <div>
                  <h3 className="font-label-md text-primary">Advanced Dressage Form</h3>
                  <p className="font-label-xs text-on-surface-variant mb-1">Trainer: Marcus L.</p>
                  <p className="font-label-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 
                    Today, 14:00
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-outline-variant/30 pt-4 mb-4">
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>SAR 450.00</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Platform Fee</span>
                  <span>SAR 6.00</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>VAT (15%)</span>
                  <span>SAR 68.40</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-outline-variant/30 pt-4 font-title-lg text-primary">
                <span>Total</span>
                <span>SAR 524.40</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-lg">
              <h2 className="font-title-md text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">lock</span>
                Secure Payment
              </h2>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block font-label-sm text-on-surface mb-2">Cardholder Name</label>
                  <input type="text" required className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Sarah Al-Ahmed" />
                </div>

                <div>
                  <label className="block font-label-sm text-on-surface mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" required className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 pl-12 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono" placeholder="4000 0000 0000 0000" />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">credit_card</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-on-surface mb-2">Expiry Date</label>
                    <input type="text" required className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface mb-2">CVV</label>
                    <input type="text" required className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center" placeholder="123" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-title-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Processing...
                    </>
                  ) : (
                    <>Pay SAR 524.40</>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center flex items-center justify-center gap-2 text-outline font-label-xs">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Payments are securely processed by Moyasar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
