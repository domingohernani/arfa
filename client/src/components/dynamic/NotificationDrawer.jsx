import { Drawer } from "flowbite-react";
import { useState, useEffect } from "react";
import notif from "../../assets/icons/notif.svg";
import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { auth } from "../../firebase/firebase";
import { getNotifNewStock } from "../../firebase/notification";
import { CubeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../globalFunctions";
export function NotificationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClose = () => setIsOpen(false);

  // Fetch notifications when the drawer is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;

      if (user) {
        // Use the getNotifNewStock function to fetch notifications
        const userNotifications = await getNotifNewStock(user.uid);
        console.log(userNotifications);

        setNotifications(userNotifications);
      } else {
        console.warn("User not logged in");
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleNotificationClick = (notif) => {
    if (notif.type === "stock" && notif.furnitureId && notif.title) {
      const name = toSlug(notif.furnitureName);
      navigate(`/catalog/item/${name}/${notif.furnitureId}`);
    }
  };

  const displayNotification = () => {
    if (notifications.length === 0) {
      return (
        <section className="px-4 text-center">
          <p className="text-sm text-arfablack">No notifications available</p>
        </section>
      );
    }

    return notifications.map((notif, index) => {
      // Determine the icon based on the notification type
      const Icon = notif.type === "stock" ? CubeIcon : HiCalendar;

      return (
        <section className="px-4 " key={notif.id || index}>
          <Timeline>
            <Timeline.Item>
              <Timeline.Point
                className="bg-yellow-400"
                icon={() => <Icon className="text-white" />}
              />
              <Timeline.Content>
                <Timeline.Time className="text-sm">
                  {notif.timestamp?.toDate().toLocaleString() || "No Date"}
                </Timeline.Time>
                <Timeline.Title
                  className="text-sm cursor-pointer hover:underline"
                  onClick={() => handleNotificationClick(notif)}
                >
                  {notif.title}
                </Timeline.Title>
                <Timeline.Body className="text-sm">
                  {notif.message}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </section>
      );
    });
  };

  return (
    <>
      <img
        src={notif}
        onClick={() => setIsOpen(true)}
        alt="notif"
        className="w-4 h-auto mx-3 cursor-pointer"
      />
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header
          className="text-arfablack"
          title="Notification"
          titleIcon={() => <></>}
        />
        <Drawer.Items>{displayNotification()}</Drawer.Items>
      </Drawer>
    </>
  );
}
