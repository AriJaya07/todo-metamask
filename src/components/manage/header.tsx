"use client"

export default function Header(props: {
  onClick(): void;
  address: any;
}): JSX.Element {

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text
    }

    const ellipse = "...";
    const helfLength = Math.floor((maxLength - ellipse.length) / 2);
    const start = text.substring(0, helfLength);
    const end = text.substring(text.length - helfLength);

    return `${start}${ellipse}${end}`
  };

  return (
    <div className="flex flex-row justify-between p-5 bg-white">
      <div className="">
        <h5 className="text-[1.5em] font-[600]">TO-DO</h5>
      </div>
      <div className="">
        <button
          type="button"
          onClick={props.onClick}
          className="bg-black text-[0.85em] font-[600] text-white rounded-2xl px-6 py-3 cursor-pointer"
        >
          {props.address ? truncateText(props.address, 15) : "Sign In"}
        </button>
      </div>
    </div>
  );
}
