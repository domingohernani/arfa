import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export const CustomRowActions = ({
  data,
  viewAction,
  viewFunc,
  editAction,
  deleteAction,
  deleteFunc,
}) => {
  const viewBtnClick = () => {
    if (viewFunc) {
      viewFunc(data.id);
    }
  };

  const deleteBtnClick = () => {
    if (deleteFunc) {
      deleteFunc({ name: data.name, id: data.id });
    }
  };

  return (
    <Menu as="div" className="relative inline-block w-full text-center ">
      <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 bg-transparent hover:border-transparent group hover:text-gray-900">
        <EllipsisVerticalIcon className="text-arfablack size-4" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {viewAction && (
          <MenuItem
            as="div"
            className="flex items-center"
            onClick={viewBtnClick}
          >
            <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
              <div className="flex items-center gap-2">
                <EyeIcon className="text-gray-500 size-4" />
                <span className="text-sm font-medium cursor-pointer">View</span>
              </div>
              <span className="hidden text-sm text-gray-500 transition-opacity opacity-0 duration-900 group-hover:inline group-hover:opacity-100">
                ⌘V
              </span>
            </button>
          </MenuItem>
        )}

        {editAction && (
          <MenuItem
            as="div"
            className="flex items-center"
            onClick={() => {
              alert(data.id);
            }}
          >
            <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
              <div className="flex items-center gap-2">
                <PencilIcon className="text-gray-500 size-4" />
                <span className="text-sm font-medium cursor-pointer">Edit</span>
              </div>
              <span className="hidden text-sm text-gray-500 group-hover:inline">
                ⌘E
              </span>
            </button>
          </MenuItem>
        )}

        {deleteAction && (
          <MenuItem
            as="div"
            className="flex items-center"
            onClick={deleteBtnClick}
          >
            <button className="group flex w-full items-center gap-2 text-arfablack rounded-lg py-1.5 px-3 justify-between">
              <div className="flex items-center gap-2">
                <TrashIcon className="text-gray-500 size-4" />
                <span className="text-sm font-medium cursor-pointer">
                  Delete
                </span>
              </div>
              <span className="hidden text-sm text-gray-500 transition-opacity opacity-0 duration-900 group-hover:inline group-hover:opacity-100">
                ⌘D
              </span>
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};
