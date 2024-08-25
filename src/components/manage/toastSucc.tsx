export default function ToastSucc(props: { message: string[] }): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-row gap-[0.8em]">
          <img
            src="images/success.png"
            alt="success"
            className="w-[1.1em] h-[1.1em] mt-[0.2em]"
          />
          <div className="flex flex-col">
            <p className="md:text-[1em] text-[0.85em] font-[500] text-black">
              {props.message[0]}
            </p>
            <p className="md:text-[0.85em] text-[0.75em] font-[400] text-black">
              {props.message[1]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
