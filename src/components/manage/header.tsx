export default function Header(props: {onClick(): void}): JSX.Element {
  return (
    <div className="flex flex-row justify-between p-5 bg-white">
      <div className="">
        <h5 className="text-[1.5em] font-[600]">TO-DO</h5>
      </div>
      <div className="">
        <button
          type="button"
          onClick={props.onClick}
          className="bg-black text-[1em] font-[600] text-white rounded-2xl px-6 py-3"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
