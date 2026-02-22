import { Icon } from "@iconify/react";

interface IConfirmDeleteProps {
  onCloseModal: () => void;
  onConfirmDelete: () => void;
}
const ConfirmDelete = (props: IConfirmDeleteProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 border border-[#FF7F50]">
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <Icon
          icon="streamline:delete-1-solid"
          className="text-4xl text-red-600"
        />
        <div className="font-bold text-3xl">Are you sure?</div>
        <div className="flex gap-2 justify-end font-bold">
          <button
            onClick={props.onCloseModal}
            className="border border-[#FF7F50] p-2 rounded-2xl w-25 cursor-pointer h-fit"
          >
            Cancel
          </button>
          <button
            onClick={props.onConfirmDelete}
            className="bg-[#FF7F50] text-white p-2 rounded-2xl w-25 cursor-pointer h-fit"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
