type AlertProps = {
  message: string;
};

export const Alert = ({ message }: AlertProps) => (
  <div role="alert">
    <div className="border border-red-400 rounded bg-red-100  py-2 px-4 text-red-700">
      <p>{message}</p>
    </div>
  </div>
);
