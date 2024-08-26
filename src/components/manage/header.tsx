export default function Header(props: {
  onClick(): void;
  logout(): void;
  address: any;
}): JSX.Element {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }

    const ellipse = "...";
    const helfLength = Math.floor((maxLength - ellipse.length) / 2);
    const start = text.substring(0, helfLength);
    const end = text.substring(text.length - helfLength);

    return `${start}${ellipse}${end}`;
  };

  return (
    <div className="fixed z-[20] w-full">
      <div className="flex flex-row justify-between md:px-10 px-5 py-5 bg-white">
        <div className="">
          <h5 className="text-[1.5em] font-[600]">TO-DO</h5>
        </div>
        <div className="flex flex-row items-center gap-[1em]">
          <button
            type="button"
            onClick={props.onClick}
            className={`${
              props.address
                ? "bg-white text-black"
                : "bg-black text-white px-6 py-3"
            } text-[0.85em] font-[600] text-white rounded-lg  cursor-pointer`}
          >
            {props.address ? (
              <div className="flex flex-row items-center border border-gray-300 px-5 py-2 rounded-lg gap-[1em]">
                <img src="images/user.png" alt="user" className="w-[1em]" />
                <span className="text-black">
                  {truncateText(props.address, 12)}
                </span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <button
            type="button"
            onClick={props.logout}
            className={`${props.address ? "block" : "hidden"}`}
          >
            <img src="images/logout.png" alt="logout" className="w-[1em]" />
          </button>
        </div>
      </div>
    </div>
  );
}
