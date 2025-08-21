export interface InputType {
  id: string;
  type:
    | "text"
    | "submit"
    | "password"
    | "email"
    | "date"
    | "datetime"
    | "reset"
    | "number"
    | "datetime-local";
  name: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (input: InputType) => {
  const { name, className, onChangeFunc } = input;
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2 mt-4">
      <label htmlFor={input.id}>{name}</label>
      <input
        onChange={onChangeFunc}
        className={` !${className} p-2 rounded-md bg-zinc-100 w-full border border-zinc-300`}
        {...input}
      />
    </div>
  );
};

export default Input;
