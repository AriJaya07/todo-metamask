export default function ToastSucc(): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-row gap-[1em] items-center">
          <img src="images/success.png" alt="success" className="w-[1.5em] h-[1.5em]" />
          <div className="flex flex-col">
            <p className="text-[1em] font-[500]">Create Task Successfully</p>
            <p className="text-[0.85em] font-[400]">All Done! Your task was successfully created</p>
          </div>
        </div>
      </div>
    </div>
  );
}
