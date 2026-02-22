interface ITextInputFieldProps {
  id: string;
  label?: string;
  textValue: string;
  onChangeFunction: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  maxLength?: number;
  disable?: boolean;
}

const TextInputField = (props: ITextInputFieldProps) => {
  return (
    <div id={`${props.id}-input`} className="flex flex-col gap-2">
      {props.label && (
        <p className="font-bold">
          {props.label}
          <span className={props.required ? "text-red-500" : "hidden"}> *</span>
        </p>
      )}
      <div className="flex flex-col gap-1">
        <input
          type="text"
          className={`h-12 w-full outline-[#BEBEBE] outline-1 focus:outline-[#F28C28] rounded-2xl p-3 cursor-pointer ${props.disable ? "opacity-50 pointer-events-none" : ""}`}
          placeholder={props.placeholder ?? ""}
          value={props.textValue}
          maxLength={props.maxLength ?? 100}
          onChange={(e) => {
            props.onChangeFunction(e.target.value);
          }}
          disabled={props.disable}
        />
        {props.errorMessage && (
          <p className="text-red-500 text-[14px]">{props.errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TextInputField;
