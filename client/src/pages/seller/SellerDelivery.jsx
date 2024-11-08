import React, { useEffect, useState, useMemo, useRef } from "react";
import { regions } from "select-philippines-address";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { getDelivery } from "../../firebase/shop";
import { useStore } from "../../stores/useStore";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { UpdateDeliveryFee } from "../../components/modals/UpdateDeliveryFee";
import toast from "react-hot-toast";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SellerDelivery = () => {
  const gridRef = useRef();
  const { loggedUser } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const regionData = useStore((state) => state.regionData);
  const setRegionData = useStore((state) => state.setRegionData);
  const [location, setLocation] = useState("");
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [fee, setCurrentFee] = useState(0);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [doDeliver, setDoDeliver] = useState(false);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Region Name",
        field: "region_name",
        filter: "agTextColumnFilter",
        flex: 2,
      },
      {
        headerName: "Delivery Available",
        field: "doDeliver",
        filter: "agTextColumnFilter",
        flex: 1,
        cellRenderer: (params) => (params.value ? "Yes" : "No"),
      },
      {
        headerName: "Free Delivery",
        field: "isFreeDelivery",
        filter: "agTextColumnFilter",
        flex: 1,
        cellRenderer: (params) => {
          return params.value ? "Yes" : "No";
        },
      },
      {
        headerName: "Delivery Price (₱)",
        field: "price",
        filter: "agNumberColumnFilter",
        flex: 1,
        cellRenderer: (params) => {
          return params.data.doDeliver ? params.value : "---";
        },
      },
      {
        headerName: "Action",
        flex: 1,
        filter: false,
        cellRenderer: (params) => {
          return (
            <section className="flex items-center justify-center gap-2 px-2 mt-1">
              <button
                className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
                onClick={() => {
                  const data = params.data;
                  updateDeliveryFee(
                    data.region_name,
                    data.price,
                    data.isFreeDelivery,
                    data.doDeliver
                  );
                }}
              >
                <ArrowPathIcon className="inline-block w-4 h-4 mr-1" />
                <span className="text-sm">Update</span>
              </button>
            </section>
          );
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  const fetchAddress = async () => {
    try {
      const regionsData = await regions();
      const deliveryData = await getDelivery(loggedUser.userId);

      const combinedData = regionsData.map((region) => {
        const matchingDelivery = deliveryData.find(
          (del) => del.location === region.region_name
        );

        return {
          ...region,
          doDeliver: matchingDelivery ? matchingDelivery.doDeliver : false,
          isFreeDelivery: matchingDelivery
            ? matchingDelivery.isFreeDelivery
            : false,
          location: matchingDelivery
            ? matchingDelivery.location
            : region.region_name,
          price: matchingDelivery ? matchingDelivery.price : 0,
        };
      });

      setRegionData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (loggedUser && loggedUser.userId) {
      fetchAddress();
    }
  }, [loggedUser]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateDeliveryFee = (location, fee, isFreeDelivery, doDeliver) => {
    setLocation(location);
    setCurrentFee(fee);
    setIsFreeDelivery(isFreeDelivery);
    setDoDeliver(doDeliver);
    setModalOpen(true);
  };

  const updateResultMessage = (message, isSuccess) => {
    if (isSuccess) {
      setIsUpdateSuccess(!isUpdateSuccess);
      toast.success(message);
      fetchAddress();
    } else {
      toast.error(message);
    }
  };

  return (
    <section className="m-5">
      <div
        className="ag-theme-quartz"
        style={{ height: "813px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={regionData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // pagination={true}
          // paginationPageSize={15}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          // paginationPageSizeSelector={[15, 25, 50]}
          domLayout="normal"
        />
      </div>
      {modalOpen && (
        <UpdateDeliveryFee
          shopId={loggedUser.userId}
          location={location}
          fee={fee}
          freeDelivery={isFreeDelivery}
          delivery={doDeliver}
          isOpen={modalOpen}
          close={closeModal}
          updateResultMessage={updateResultMessage}
        />
      )}
    </section>
  );
};

export default SellerDelivery;
