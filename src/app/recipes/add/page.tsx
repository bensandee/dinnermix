"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import { useFormStatus } from "react-dom";
import {
  insertRecipeAction,
  InsertRecipeActionType,
} from "@/components/actions";

/** the normal representation of the recipe outside of the data layer */
type FormData = InsertRecipeActionType;

export default function AddRecipe() {
  const { register, handleSubmit } = useForm<FormData>();

  const insertRecipeShim = (data: FormData) => {
    return insertRecipeAction(data);
  };

  const onSubmit = handleSubmit(insertRecipeShim);

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
      <div className="relative p-2 w-full"></div>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  "use client";

  const { pending } = useFormStatus();
  return (
    <Button
      className="btn-primary absolute p-2 w-48 left-2"
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </Button>
  );
};
