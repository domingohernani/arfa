import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { formatToPeso, toSlug } from "../../components/globalFunctions";
import { useNavigate } from "react-router-dom";
import priceTag from "../../assets/icons/price-tag.svg";

const Hotspots = () => {
  const [sellerHotspots, setSellerHotspots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopsWithHotspots = async () => {
      try {
        const shopsCollection = collection(db, "shops");
        const shopsSnapshot = await getDocs(shopsCollection);

        const hotspotsData = [];

        for (const shopDoc of shopsSnapshot.docs) {
          const shopId = shopDoc.id;
          const imageHotspotCollection = collection(
            db,
            "shops",
            shopId,
            "image-hotspot"
          );
          const imageHotspotSnapshot = await getDocs(imageHotspotCollection);

          if (!imageHotspotSnapshot.empty) {
            imageHotspotSnapshot.forEach((doc) => {
              if (doc.id === "data") {
                hotspotsData.push({ shopId, ...doc.data() });
              }
            });
          }
        }

        const getRandomItems = (arr, n) => {
          const result = [];
          const usedIndices = new Set();
          while (result.length < n && usedIndices.size < arr.length) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if (!usedIndices.has(randomIndex)) {
              result.push(arr[randomIndex]);
              usedIndices.add(randomIndex);
            }
          }
          return result;
        };

        const randomHotspots = getRandomItems(hotspotsData, 2);
        setSellerHotspots(randomHotspots);

        // Refresh AOS after content is loaded
      } catch (error) {
        console.error("Error fetching hotspots:", error);
      }
    };

    fetchShopsWithHotspots();
  }, []);

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <section className="flex flex-col bg-white">
      {sellerHotspots &&
        sellerHotspots.map((seller, index) => {
          const shopName = seller.hotspots[0].furniture.shopDetails.name;

          return (
            <div key={index}>
              <div className="relative">
                {/* Uploaded Image */}
                <img
                  src={seller.imageUrl}
                  alt={`Hotspot image from Shop ${seller.shopId}`}
                  className="w-full rounded-md"
                />
                <section className="absolute flex-col hidden gap-4 pointer-events-none sm:flex bottom-5 left-5">
                  <h2
                    className="text-sm font-extrabold tracking-tight text-white sm:text-base md:text-lg lg:text-xl dark:text-green"
                    style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
                  >
                    Featured Collection - {index + 1}
                  </h2>
                  <hr />
                  <h2
                    className="mb-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-4xl dark:text-green"
                    style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
                  >
                    {shopName}
                  </h2>
                </section>

                {/* Render Hotspots */}
                {seller.hotspots.map((hotspot) => (
                  <div
                    title={`Click this price tag to visit '${hotspot.furniture?.name}'`}
                    onClick={() => {
                      const slugName = toSlug(hotspot.furniture.name);
                      const id = hotspot.furniture.id;
                      window.scrollTo({ top: 0 });
                      navigate(`/catalog/item/${slugName}/${id}`);
                    }}
                    key={hotspot.id}
                    style={{
                      position: "absolute",
                      top: hotspot.top,
                      left: hotspot.left,
                      // width: "5rem",
                      // height: "auto",
                      borderRadius: "50%",
                      cursor: "pointer",
                      transform: "translate(-50%, -50%)",
                    }}
                    className="flex items-center justify-center w-10 h-auto md:w-16 lg:w-20 group"
                  >
                    {/* Hotspot Marker */}
                    <div className="w-3 h-3 bg-white rounded-full opacity-100"></div>
                    <img src={priceTag} />

                    {/* Tooltip */}
                    <div className="absolute z-20 hidden w-48 p-4 mb-2 text-sm text-black transform -translate-x-1/2 bg-white rounded-md shadow-lg bottom-full left-1/2 group-hover:block">
                      <div className="font-semibold text-arfagreen">
                        {truncateText(hotspot.furniture.name, 30)}
                      </div>
                      <div className="text-sm">
                        {truncateText(hotspot.furniture.description, 50)}
                      </div>
                      <div className="mt-2 text-lg font-bold">
                        {hotspot.furniture.isSale
                          ? formatToPeso(hotspot.furniture.discountedPrice)
                          : formatToPeso(hotspot.furniture.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Hotspots;
