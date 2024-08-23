export default function ToastFailed(): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-row gap-[1em] items-center">
          <img
            src="images/failed.png"
            alt="success"
            className="w-[1.5em] h-[1.5em]"
          />
          <div className="flex flex-col">
            <p className="md:text-[1em] text-[0.85em] font-[500] text-red-500">
              Error Creating Task
            </p>
            <p className="md:text-[1em] text-[0.85em] font-[400] text-red-500">
              Oops! Something went wrong. Unable to create task.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
