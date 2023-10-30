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

  const { register, handleSubmit } = useForm<FormData>();

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
      <div className="form-control space-y-2">
        <h2 className="font-bold">Add New Recipe</h2>
        <p>
          New recipes are fun and cool. Add them to <i>your</i> mix.
        </p>
        <div className="p-2">
          <label id="nameLabel" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered w-1/2"
            aria-labelledby="nameLabel"
            {...register("name")}
          />
        </div>

        <div className="p-2">
          <label id="slugLabel" className="label">
            <span className="label-text">Slug</span>
          </label>
          <input
            className="input input-bordered w-full"
            aria-labelledby="slugLabel"
            {...register("slug")}
          />
        </div>

        <div className="p-2">
          <label id="descriptionLabel" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24 w-full"
            aria-labelledby="descriptionLabel"
          />
        </div>

        <div className="p-2">
          <label id="urlLabel" className="label">
            <span className="label-text">URL</span>
          </label>
          <input
            className="input input-bordered w-full"
            {...register("url")}
            aria-labelledby="urlLabel"
          />
        </div>
      </div>
      <div className="relative p-2 w-full">
        <Button className="btn-primary absolute p-2 w-48 right-2" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
