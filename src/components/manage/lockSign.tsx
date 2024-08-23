export default function LockSign(props: { onClick(): void }): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center w-full border border-gray-300 bg-[#F4F4F5] rounded-lg p-10 gap-[1em]">
      <div className="">
        <img src="images/lock.png" alt="lock" className="w-[5em]" />
      </div>
      <div className="flex flex-col justify-center items-center gap-[0.5em]">
        <p className="text-[1em] text-black">Sign in Required</p>
        <p className="text-[0.85em] text-gray-500">
          Hold on! You need to Sign In to create a task.
        </p>
        <div className="">
          <button
            type="button"
            onClick={props.onClick}
            className="bg-black px-6 py-2 rounded-xl font-[400] text-[1em] text-white"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
