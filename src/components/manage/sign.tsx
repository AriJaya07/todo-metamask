"use client";

export default function Sign(props: {
  onClick(): void;
  handleLogin: any;
  address: any;
}): JSX.Element {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white px-10 py-6 rounded-lg shadow-md md:w-1/2 w-5/6 flex flex-col justify-center">
        <div className="flex justify-end">
          <button type="button" onClick={props.onClick} className="text-[1em]">
            &times;
          </button>
        </div>
        <h5 className="text-[1.5em] font-[600]">Sign In</h5>
        <p className="text-gray-500 text-[1em] font-[400]">
          Connect your wallet to sign in
        </p>
        <button
          type="button"
          className="flex flex-row border border-gray-300 rounded-lg justify-center items-center p-2 gap-[1em]"
        >
          <div className="">
            <img src="images/metamask.png" alt="metamask" className="w-[2em]" />
          </div>
          <div className="">
            <p onClick={props.handleLogin} className="text-gray-500 text-[1em]">
              {props.address
                ? `Connected: ${props.address}`
                : "Sign In with Metamask"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
