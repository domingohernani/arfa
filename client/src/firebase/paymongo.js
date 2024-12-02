import axios from "axios";

const paymongo = axios.create({
  baseURL: import.meta.env.VITE_PAYMONGO_BASE_URL,
  headers: {
    Authorization: `Basic ${btoa(import.meta.env.VITE_PAYMONGO_SK)}`, // Encode API key
    "Content-Type": "application/json",
  },
});

export const createPaymentLink = async ({ amount, description }) => {
  try {
    const response = await paymongo.post("/links", {
      data: {
        attributes: {
          amount: amount * 100,
          description,
        },
      },
    });
    const checkoutUrl = response.data.data.attributes.checkout_url;
    const paymentId = response.data.data.id; // Assuming the API response includes a payment ID

    // Return the payment link and payment ID
    return { checkoutUrl, paymentId };
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw new Error(
      error.response?.data?.errors[0]?.detail || "An error occurred"
    );
  }
};

export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await paymongo.get(`/links/${paymentId}`);
    const status = response.data.data.attributes.status;

    if (status === "paid") {
      return true;
    } else if (status === "pending" || status === "unpaid") {
      return false;
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    return false;
  }
};

export const processPayment = async ({ amount, description }) => {
  try {
    const { checkoutUrl, paymentId } = await createPaymentLink({
      amount,
      description,
    });

    const paymentSuccess = await new Promise((resolve) => {
      const interval = setInterval(async () => {
        const isPaid = await checkPaymentStatus(paymentId);
        if (isPaid) {
          clearInterval(interval);
          resolve(true);
        }
      }, 5000);
    });

    return paymentSuccess;
  } catch (error) {
    console.error("Payment process error:", error);
    return false;
  }
};
