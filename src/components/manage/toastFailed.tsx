export default function ToastFailed(props: { message: string[] }): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-row gap-[0.8em]">
          <img
            src="images/failed.png"
            alt="success"
            className="w-[1.1em] h-[1.1em] mt-[0.3em]"
          />
          <div className="flex flex-col">
            <p className="md:text-[1em] text-[0.85em] font-[500] text-red-500">
              {props.message[0]}
            </p>
            <p className="md:text-[1em] text-[0.85em] font-[400] text-red-500">
              {props.message[1]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
