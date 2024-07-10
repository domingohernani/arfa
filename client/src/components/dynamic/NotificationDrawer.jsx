import { Drawer } from "flowbite-react";
import { useState } from "react";
import notif from "../../assets/icons/notif.svg";

const displayNotification = () => {
  const notifcs = Array(5).fill(null);

  return notifcs.map((e, index) => (
    <section className="flex items-center gap-4 my-5 " key={index}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#111827"
          id="Outline"
          viewBox="0 0 24 24"
          width="512"
          height="512"
          className="w-4 h-4 "
        >
          <path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="w-full font-medium">New Arrivals Alert! </span>
          <span className="text-xs text-gray-400 flex items-center">
            <span>3:00</span>
            <span className="ml-1">am</span>
          </span>
        </div>
        <span className="w-full text-sm">
          Discover the latest furniture collections. Shop now and elevate your
          home decor.
        </span>
      </div>
    </section>
  ));
};

export function NotificationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
