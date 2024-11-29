import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FooterSection } from "../components/navigation/FooterSection";
import SearchlessNavigationBar from "../components/SearchlessNavigationBar";

const FAQ = () => {
  const faqs = [
    {
      question: "How does augmented reality work on your website?",
      answer:
        "Our augmented reality feature allows you to view furniture in your space using your mobile device or AR-compatible browser. Simply click on the 'AR Button' button on any product page.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit cards, e-wallets, and other locally available options.",
    },
    {
      question: "Can I purchase items from multiple sellers in one checkout?",
      answer:
        "Yes, you can add items from multiple sellers to your cart and check out in a single transaction. Orders will be processed separately for each seller.",
    },
    {
      question: "Do you offer free delivery?",
      answer:
        "Free delivery depends on the seller and is available for certain regions in the country (PH). Check the product page or your cart for specific delivery details.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is confirmed, you can track its status from your orders page under the 'In Process' section.",
    },
    {
      question: "How do I know if a product is available in my area?",
      answer:
        "Product availability depends on the seller and your location. You can enter your delivery address to see if the item can be delivered to your area.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at arfaph.hello@gmail.com or by phone at +63 945 346 7841.",
    },
    {
      question: "How do I list my furniture for sale?",
      answer:
        "To list your furniture, log in to your seller account, navigate to 'Product' and click on 'New Product' to upload details and images or 3D Model.",
    },
    {
      question: "What fees do you charge sellers?",
      answer:
        "We currently charge a small commission fee (5%) per transaction.",
    },
    {
      question: "Can I manage stock for my furniture?",
      answer:
        "Yes, you can update stock quantities and manage inventory directly from your stock page.",
    },
    {
      question: "How do I update my shop details?",
      answer:
        "You can update your shop details, including your shop name, address, business permit, logo, and valid ID, from the 'Settings' page in your seller dashboard. Simply make the necessary changes and click 'Edit' to save your updates.",
    },
    {
      question: "How do I handle shipping for orders?",
      answer:
        "You can choose to handle shipping yourself or use our partnered courier services. Be sure to set accurate delivery times for your products.",
    },
    {
      question: "How do I get paid as a seller?",
      answer:
        "Payments are processed on a monthly basis. You can provide and update your payout details on the settings page in your seller dashboard.",
    },
    {
      question: "Can I offer discounts and promotions?",
      answer:
        "Yes, you can create discounts and promotions for your shop from the seller dashboard to attract more shoppers.",
    },
  ];

  return (
    <section>
      <section>
        <section className="mx-6 my-3">
          <SearchlessNavigationBar />
        </section>
      </section>
      <div className="max-w-5xl p-6 mx-auto bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <DisclosureButton className="flex items-center justify-between w-full py-2 font-medium text-left text-black focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  {faq.question}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="py-2 text-gray-700">
                  {faq.answer}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      <section>
        <FooterSection></FooterSection>
      </section>
    </section>
  );
};

export default FAQ;
