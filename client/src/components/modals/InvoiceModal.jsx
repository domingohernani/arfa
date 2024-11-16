import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { formatToPeso } from "../globalFunctions";

export const InvoiceModal = ({ isOpen, close, invoice }) => {
  console.log(invoice);

  const handleCancel = () => {
    close();
  };

  // Calculate the commission fee
  const commissionFee = invoice.orderTotal * 0.05;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Invoice
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  {/* Invoice Header */}
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm">Shop Name</div>
                      <div className="text-sm font-semibold">
                        {invoice.shopName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">Order ID</div>
                      <div className="text-sm font-semibold">{invoice.id}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-4">
                    <h4 className="text-base font-normal">Order Items</h4>
                    <table className="w-full mt-2 text-sm border">
                      <thead>
                        <tr className="border">
                          <th className="p-4 font-semibold">Item</th>
                          <th className="p-4 font-semibold">Variant</th>
                          <th className="p-4 font-semibold">Quantity</th>
                          <th className="p-4 font-semibold">Price</th>
                          <th className="p-4 font-semibold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.orderItems.map((item) => (
                          <tr key={item.id} className="border">
                            <td className="p-4">{item.name}</td>
                            <td className="p-4">{item.variant}</td>
                            <td className="p-4">{item.quantity}</td>
                            <td className="p-4">{formatToPeso(item.price)}</td>
                            <td className="p-4">
                              {formatToPeso(item.totalItemPrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm font-medium">
                        {formatToPeso(invoice.orderTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Commission Fee (5%)</span>
                      <span className="text-sm font-medium">
                        {formatToPeso(commissionFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Delivery Fee</span>
                      <span className="text-sm font-medium">
                        {formatToPeso(invoice.deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>
                        {formatToPeso(
                          invoice.orderTotal +
                            commissionFee +
                            invoice.deliveryFee
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                    onClick={handleCancel}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
