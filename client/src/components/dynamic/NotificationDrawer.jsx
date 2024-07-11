import { Drawer } from "flowbite-react";
import { useState } from "react";
import notif from "../../assets/icons/notif.svg";

import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";

const displayNotification = () => {
  const notifcs = Array(5).fill(null);

  return notifcs.map((e, index) => (
    <section className="px-4" key={index}>
      <Timeline>
        <Timeline.Item>
          <Timeline.Point className="text-red-300" icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time className="text-sm">11/07/2024</Timeline.Time>
            <Timeline.Title className="text-sm">
              Lorem, ipsum dolor.
            </Timeline.Title>
            <Timeline.Body className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              neque
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
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
