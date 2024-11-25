import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  TimelineTime,
  TimelineBody,
  TimelineTitle,
} from "flowbite-react";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  CogIcon,
  TruckIcon,
  HomeIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { HiCalendar } from "react-icons/hi";
import { CubeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../../hooks/useNotifications";
import { toSlug } from "../globalFunctions";
import { useNotifications } from "../../firebase/notification";
import { useState } from "react";
import notif from "../../assets/icons/notif.svg";

export function NotificationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();

  const handleClose = () => setIsOpen(false);

  const handleNotificationClick = (notif) => {
    if (notif.type === "stock" && notif.furnitureId) {
      const name = toSlug(notif.furnitureName);
      navigate(`/catalog/item/${name}/${notif.furnitureId}`);
    } else if (notif.type === "order") {
      navigate(`/profile/order/all-orders`);
    }
  };

  const iconMap = {
    ShoppingCartIcon,
    CheckCircleIcon,
    CogIcon,
    TruckIcon,
    HomeIcon,
    XCircleIcon,
    ArrowUpTrayIcon,
  };

  const displayNotifications = () => {
    if (!data || data.pages[0]?.notifications.length === 0) {
      return (
        <section className="px-4 text-center">
          <p className="text-sm text-arfablack">No notifications available</p>
        </section>
      );
    }

    return data.pages.map((page, pageIndex) =>
      page.notifications.map((notif, notifIndex) => {
        const Icon =
          notif.type === "stock" ? CubeIcon : iconMap[notif.icon] || HiCalendar;

        return (
          <section className="px-4" key={`${pageIndex}-${notifIndex}`}>
            <Timeline>
              <TimelineItem>
                <TimelinePoint
                  className="flex items-center justify-center bg-yellow-400"
                  icon={() => <Icon className="w-4 h-4 text-white" />}
                />
                <TimelineContent>
                  <TimelineTime className="text-sm">
                    {notif.timestamp?.toDate?.().toLocaleString() || "No Date"}
                  </TimelineTime>
                  <TimelineTitle
                    className="text-sm cursor-pointer hover:underline"
                    onClick={() => handleNotificationClick(notif)}
                  >
                    {notif.title}
                  </TimelineTitle>
                  <TimelineBody className="text-sm">
                    {notif.message}
                  </TimelineBody>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </section>
        );
      })
    );
  };

  return (
    <>
      <img
        src={notif}
        onClick={() => setIsOpen(true)}
        alt="notif"
        className="w-4 h-auto mx-3 cursor-pointer"
      />
      {/* <ArrowsPointingOutIcon className="w-4 h-auto mx-3 cursor-pointer" /> */}
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="transition-all ease-out"
        style={{ width: `${isFullScreen ? "90%" : "25rem"}` }}
      >
        <DrawerHeader
          className="mb-3 text-arfablack"
          title="Notification"
          titleIcon={() =>
            isFullScreen ? (
              <ArrowsPointingInIcon
                className="w-4 h-4 mx-3 cursor-pointer"
                onClick={() => setIsFullScreen(false)}
              />
            ) : (
              <ArrowsPointingOutIcon
                className="w-4 h-4 mx-3 cursor-pointer"
                onClick={() => setIsFullScreen(true)}
              />
            )
          }
        />
        <DrawerItems>
          {displayNotifications()}
          {hasNextPage && (
            <div className="my-4 text-center">
              <button
                onClick={fetchNextPage}
                disabled={isFetchingNextPage}
                className="px-4 py-2 text-sm font-normal text-white rounded bg-arfagreen"
              >
                {isFetchingNextPage ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </DrawerItems>
      </Drawer>
    </>
  );
}
