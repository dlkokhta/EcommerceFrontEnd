interface addShoesSizesInputTypes {
  register: any;
  errors: any;
  fields: any;
  append: any;
  remove: any;
}

const addShoesSizesInputField: React.FC<addShoesSizesInputTypes> = ({
  register,
  errors,
  fields,
  append,
  remove,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm" htmlFor="sizes">
        sizes
      </label>
      {fields.map((item: any, index: any) => (
        <div key={item.id} className="mb-2 flex items-center">
          <input
            {...register(`sizes.${index}.size`, {
              required: "Size is required",
            })}
            placeholder="Size"
            className="mr-2 w-full border border-slate-400 outline-green-300"
          />
          <input
            type="number"
            {...register(`sizes.${index}.quantity`, {
              required: "Quantity is required",
            })}
            placeholder="Quantity"
            className="mr-2 w-full border border-slate-400  outline-green-300"
          />
          {errors.sizes && (
            <p className="text-xs text-red">{errors.sizes.message}</p>
          )}
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-black hover:text-red"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ size: "", quantity: "" })}
        className="mt-2 w-full rounded-full bg-green-500 p-2 text-sm text-white"
      >
        Add Size
      </button>
    </div>
  );
};

export default addShoesSizesInputField;
