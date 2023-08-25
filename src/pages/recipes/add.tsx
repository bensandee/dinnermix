import { useForm } from "react-hook-form";
import { z } from "zod";

/** the normal representation of the recipe outside of mongoose */
export const RecipeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().default(""),
  url: z.string().url().default(""),
  prepCount: z.number().default(0),
  user: z.coerce.string(),
});
const FormSchema = RecipeSchema.omit({ id: true, prepCount: true, user: true });
type FormData = z.infer<typeof FormSchema>;

export default function AddRecipe() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div className="p-8">
        <label id="nameLabel" className="p-4">
          Name
        </label>
        <input
          className="p-4 border-2"
          aria-labelledby="nameLabel"
          {...register("name")}
        />
      </div>
      <div>
        <label>Slug</label>
        <input {...register("slug")} />
      </div>
      <div>
        <label>Description</label>
        <input {...register("description", { required: true })} />
      </div>

      <div>
        <label>URL</label>
        <input {...register("url", { required: true })} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
