export default function ClearTask(props: {
  onClick(): void;
  onDeleteAll(): void;
}): JSX.Element {
  return (
    <div className="fixed z-[20] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white px-6 py-6 rounded-lg shadow-md md:w-1/2 w-5/6 flex flex-col justify-center">
        <div className="flex flex-col gap-[0.5em]">
          <p className="text-[1.2em] font-[600] text-black">
            Clear Completed Task?
          </p>
          <p className="text-[0.85em] font-[500] text-gray-500">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
        </div>
        <div className="flex justify-end gap-[1em] py-2">
          <button
            type="button"
            onClick={props.onClick}
            className="bg-white rounded-lg border border-gray-300 px-5 py-2 font-[500]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={props.onDeleteAll}
            className="bg-black px-5 py-2 font-[500] text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
