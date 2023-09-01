import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertRecipeSchema } from "@/lib/db/schema";
import { useRouter } from "next/router";
import { Button } from "@/components";

/** the normal representation of the recipe outside of mongoose */
const formSchema = insertRecipeSchema.required().omit({
  id: true,
  prepCount: true,
  userId: true,
});
type FormData = z.infer<typeof formSchema>;

export default function AddRecipe() {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const insertRecipe = async (data: FormData) => {
    await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await router.push("/recipes");
  };

  const onSubmit = handleSubmit(insertRecipe);

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
        <label id="slugLabel" className="p-4">
          Slug
        </label>
        <input
          className="p-4 border-2"
          aria-labelledby="slugLabel"
          {...register("slug")}
        />
      </div>
      <div>
        <label>Description</label>
        <input {...register("description")} />
      </div>

      <div>
        <label>URL</label>
        <input {...register("url")} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
