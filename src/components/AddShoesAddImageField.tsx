interface AddSHoesAddImageTypes {
  register: any;
  errors: any;
}

const AddShoesAddImageField: React.FC<AddSHoesAddImageTypes> = ({
  register,
  errors,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm " htmlFor="image">
        image
      </label>
      <input
        className="w-full border border-slate-400  outline-green-300 "
        type="file"
        id="image"
        {...register("image")}
        name="image"
        multiple
      />
      {errors.image && (
        <p className="text-xs text-red">{errors.image.message}</p>
      )}
    </div>
  );
};

export default AddShoesAddImageField;
