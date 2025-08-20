// SubscriptionPlans.jsx
import React from 'react';
import loadRazorpay from "../../utils/Loadrazorpay";

const plans = [
  {
    name: "Beginner Plan",
    price: 49,
    features: [
      "Access to all exercise videos",
      "Progress tracking",
      "Supportive online community",
      "Personalized workout plans",
      "Access to group fitness classes"
    ],
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    name: "Pro Plan",
    price: 99,
    features: [
      "Access to all exercise videos",
      "Progress tracking",
      "Supportive online community",
      "Advanced, personalized workout plans",
      "Body composition analysis"
    ],
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    name: "Custom Plan",
    price: 149,
    features: [
      "All Pro features",
      "Fully customized workout & nutrition plan",
      "Weekly check-ins with trainer",
      "Exclusive gear discounts",
      "FitBot Access Available"
    ],
    buttonColor: "bg-red-600 hover:bg-red-700"
  }
];

const SubscriptionPlans = () => {
  async function displayRazorpay(plan) {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", 
      currency: "INR",
      amount: plan.price*100, // amount in paise => Rs 199
      name: "MakeFit App",
      description: "Pro Subscription Plan",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#f23208ff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <section className="bg-gradient-to-r from-zinc-900 to-black py-16 px-4 text-white font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-500">Our Plans</h2>
        <p className="text-gray-300 mt-2">
          Select the plan that suits your fitness goals and get expert support every step of the way.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-zinc-800 border border-red-600 rounded-xl shadow-xl hover:scale-105 transition duration-300"
          >
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold uppercase mb-2 text-orange-400">Package</h3>
              <h2 className="text-2xl font-semibold mb-3">{plan.name}</h2>
              <p className="text-xl font-bold text-red-400 mb-4">₹{plan.price} <span className="text-sm text-gray-400">/month</span></p>

              <ul className="text-left space-y-2 text-sm text-gray-300 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>

              <button
                className={`px-5 py-2 rounded-full font-semibold text-white ${plan.buttonColor} transition`} onClick={()=>displayRazorpay(plan)}
              >
                Choose This Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
