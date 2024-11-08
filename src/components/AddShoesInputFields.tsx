import React from "react";

interface AddShoesInputFieldsTypes {
  label: string;
  id: string;
  register: any;
  errors: any;
}

const AddShoesInputFields: React.FC<AddShoesInputFieldsTypes> = ({
  label,
  id,
  register,
  errors,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full border border-slate-400 outline-green-300"
        type="text"
        id={id}
        {...register(id)}
        name={id}
      />
      {errors[id] && <p className="text-xs text-red">{errors[id].message}</p>}
    </div>
  );
};
export default AddShoesInputFields;
