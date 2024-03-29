"use client";
import { FieldError, useForm } from "react-hook-form";
import { Button } from "@/components";
import { useFormStatus } from "react-dom";
import { insertRecipeAction } from "@/components/actions";
import { slugify } from "@/lib/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(8),
  slug: z.string(),
  description: z.string(),
  url: z.string().trim().url().or(z.literal("")),
});
type FormData = z.infer<typeof formSchema>;

export default function AddRecipe() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const insertRecipeShim = async (data: FormData) => {
    const error = await insertRecipeAction(data);
    if (error !== undefined) {
      setError("root", { message: error });
    }
  };

  const autoUpdateSlug = (name: string) => {
    setValue("slug", slugify(name));
  };

  return (
    <form onSubmit={handleSubmit(insertRecipeShim)}>
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
            autoComplete="off"
            className="input input-bordered w-1/2"
            aria-labelledby="nameLabel"
            {...register("name", {
              onChange: (e) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                autoUpdateSlug(e.target.value);
              },
            })}
          />
          <FieldErrorMessage error={errors.name} />
        </div>

        <div className="p-2">
          <label id="slugLabel" className="label">
            <span className="label-text">Slug</span>
          </label>
          <input
            autoComplete="off"
            className="input input-bordered w-full"
            aria-labelledby="slugLabel"
            {...register("slug")}
          />
          <FieldErrorMessage error={errors.slug} />
        </div>

        <div className="p-2">
          <label id="descriptionLabel" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            autoComplete="off"
            className="textarea textarea-bordered h-24 w-full"
            aria-labelledby="descriptionLabel"
          />
          <FieldErrorMessage error={errors.description} />
        </div>

        <div className="p-2">
          <label id="urlLabel" className="label">
            <span className="label-text">URL</span>
          </label>
          <input
            className="input input-bordered w-full"
            autoComplete="off"
            {...register("url")}
            aria-labelledby="urlLabel"
          />
          <FieldErrorMessage error={errors.url} />
        </div>
      </div>
      <div className="relative p-2 w-full"></div>
      <SubmitButton />
    </form>
  );
}

const FieldErrorMessage = ({ error }: { error?: FieldError }) => {
  return (
    <span className="text-red-700">{error && <p>{error.message}</p>}</span>
  );
};

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
