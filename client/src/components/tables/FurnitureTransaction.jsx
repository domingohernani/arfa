import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { formatToPeso } from "../globalFunctions";
import { db } from "../../firebase/firebase";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

export const FurnitureTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gridRef = useRef();
  const [furniture, setFurniture] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Transaction ID",
        field: "id",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Order Total (₱)",
        field: "orderTotal",
        flex: 1,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => formatToPeso(params.value),
      },
      { headerName: "Status", field: "orderStatus", flex: 1 },
      {
        headerName: "Quantity",
        field: "quantity",
        flex: 1,
        filter: "agNumberColumnFilter",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      floatingFilter: true,
      sortable: true,
    }),
    []
  );

  const fetchFurniture = async () => {
    setLoading(true);
    try {
      // Fetch furniture details
      const furnitureRef = collection(db, "furnitures");
      const furnitureSnapshot = await getDocs(
        query(furnitureRef, where("id", "==", id))
      );
      const furnitureData = furnitureSnapshot.docs[0]?.data();
      setFurniture(furnitureData);

      // Fetch all orders with "Delivered" or "Picked-up" status
      const ordersRef = collection(db, "orders");
      const ordersQuery = query(
        ordersRef,
        where("orderStatus", "in", ["Delivered", "Picked-up"])
      );

      const ordersSnapshot = await getDocs(ordersQuery);
      const filteredOrders = ordersSnapshot.docs
        .map((doc) => {
          const orderData = doc.data();
          const matchingItem = orderData.orderItems.find(
            (item) => item.id === id
          );

          // Only include the order if it contains the furniture item with the specified id
          if (matchingItem) {
            return {
              id: doc.id,
              orderTotal: orderData.orderTotal,
              orderStatus: orderData.orderStatus,
              quantity: matchingItem.quantity,
            };
          }
          return null;
        })
        .filter((order) => order !== null);

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching furniture or orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFurniture();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <nav className="flex items-center gap-2 mb-3">
        <div className="p-1 w-fit">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/seller-page/report")}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h6
            className="font-normal cursor-pointer hover:text-arfagreen"
            onClick={() => navigate("/seller-page/report")}
          >
            Best-Selling Products by Units Sold
          </h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="font-normal cursor-pointer hover:text-arfagreen">
            Furniture Transactions
          </h6>
        </div>
      </nav>

      {/* Product Details */}
      <section className="border">
        <header className="px-3 py-4 text-sm font-medium border-b bg-arfagray">
          Product Details
        </header>
        <header className="flex flex-col gap-1 px-3 py-5 md:flex-row md:gap-3">
          <section className="flex flex-col gap-1 basis-3/5">
            <h3 className="text-sm font-medium">
              Product ID:{" "}
              <span className="font-normal text-gray-600">{furniture.id}</span>
            </h3>
            <h3 className="text-sm font-medium">
              Name:{" "}
              <span className="font-normal text-gray-600">
                {furniture.name}
              </span>
            </h3>
            <h3 className="text-sm font-medium">
              Description:{" "}
              <span className="font-normal text-gray-600">
                {furniture.description}
              </span>
            </h3>
          </section>

          <section className="flex flex-col flex-1 gap-1">
            <h3 className="text-sm font-medium">
              Category:{" "}
              <span className="font-normal text-gray-600">
                {furniture.category}
              </span>
            </h3>
            <h3 className="text-sm font-medium">
              Price:{" "}
              <span className="font-normal text-gray-600">
                {formatToPeso(furniture.price)}
              </span>
            </h3>
            {furniture.isSale && (
              <h3 className="text-sm font-medium">
                Discounted Price:{" "}
                <span className="font-normal text-gray-600">
                  {formatToPeso(furniture.discountedPrice)}
                </span>
              </h3>
            )}
            <h3 className="text-sm font-medium">
              Status:{" "}
              <span
                className={`font-normal ${
                  furniture.isSale ? "text-blue-600" : "text-green-500"
                }`}
              >
                {furniture.isSale ? "On Sale" : "Not On Sale"}
              </span>
            </h3>
            {!furniture.variants.every(
              (variant) =>
                variant.name === "" && variant.imagePaths.length === 0
            ) && (
              <h3 className="text-sm font-medium">
                Variant:{" "}
                <span className="font-normal text-gray-600">
                  {furniture.variants.map((variant) => variant.name).join(", ")}
                </span>
              </h3>
            )}
            <h3 className="text-sm font-medium">
              Dimension:{" "}
              <span className="text-sm font-normal leading-relaxed text-gray-600">
                {furniture.width} cm /{" "}
              </span>
              <span className="text-sm font-normal leading-relaxed text-gray-600">
                {furniture.depth} cm /{" "}
              </span>
              <span className="text-sm font-normal leading-relaxed text-gray-600">
                {furniture.height} cm
              </span>
            </h3>
          </section>
        </header>
      </section>
      <header className="px-3 py-4 mt-5 text-sm font-medium border-t border-x bg-arfagray">
        Related Transactions
      </header>
      {/* Orders AG Grid */}
      <div className="ag-theme-quartz" style={{ height: "600px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={orders}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={15}
          domLayout="normal"
          suppressRowClickSelection={true}
          paginationPageSizeSelector={[15, 25, 50]}
        />
      </div>
    </div>
  );
};
