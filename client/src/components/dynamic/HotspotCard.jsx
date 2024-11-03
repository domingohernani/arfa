import React, { useEffect, useState, Fragment } from "react";
import { useStore } from "../../stores/useStore";
import { where } from "firebase/firestore";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { Dialog, Transition } from "@headlessui/react";

const HotspotCard = ({ isOpen, close, handleSaveCard }) => {
  const { loggedUser } = useStore();
  const [rowFurnituresData, setRowFurnituresData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const fetchFurniture = async () => {
    try {
      const filter = [where("ownerId", "==", loggedUser.userId)];
      const furnitures = await fetchFurnitureCollection("furnitures", filter);
      setRowFurnituresData(furnitures);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    }
  };

  useEffect(() => {
    if (loggedUser && loggedUser.userId) {
      fetchFurniture();
    }
  }, [loggedUser]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Find the selected furniture object based on the name
    const selected = rowFurnituresData.find(
      (furniture) => furniture.name === value
    );
    setSelectedProduct(selected || null);
  };

  const handleSave = () => {
    if (handleSaveCard && selectedProduct) {
      handleSaveCard(selectedProduct);
    }
    close();
  };

  return (
    <Transition appear show={isOpen} as={Fragment} className="z-40">
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Select Product
                </Dialog.Title>
                <div className="mt-2">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
                    Product
                  </label>
                  <input
                    className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    list="products"
                    placeholder="Choose a product"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <datalist id="products">
                    {rowFurnituresData.map((furniture) => (
                      <option key={furniture.id} value={furniture.name} />
                    ))}
                  </datalist>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HotspotCard;
