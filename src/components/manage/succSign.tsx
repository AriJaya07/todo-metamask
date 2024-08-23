export default function SuccSign(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center w-full border border-gray-300 bg-[#F4F4F5] rounded-lg p-10 gap-[1em]">
      <div className="">
        <img src="images/copy-plus.png" alt="lock" className="w-[5em]" />
      </div>
      <div className="flex flex-col justify-center items-center gap-[0.5em]">
        <p className="text-[1em] text-black">Oops, nothing here!</p>
        <p className="text-[0.85em] text-gray-500">
          No tasks found! Time to create something new?
        </p>
      </div>
    </div>
  );
}
