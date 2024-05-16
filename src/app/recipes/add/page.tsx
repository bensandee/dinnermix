"use client";
import { FieldError, useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { insertRecipeAction } from "@/components/actions";
import { slugify } from "@/lib/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
      <div className="form-control space-y-2 p-2">
        <div>
          <h1 className="font-bold text-2xl">Add New Recipe</h1>
          <p className="text-sm">
            New recipes are fun and cool. Add them to <i>your</i> mix.
          </p>
        </div>
        <div>
          <label id="nameLabel" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            autoComplete="off"
            className="input input-bordered w-1/2"
            aria-labelledby="nameLabel"
            {...register("name", {
              onChange: (e: Event) => {
                const target = e.target as HTMLInputElement;
                autoUpdateSlug(target.value);
              },
            })}
          />
          <FieldErrorMessage error={errors.name} />
        </div>

        <div>
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

        <div>
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

        <div>
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
        <div className="space-x-4 text-end">
          <CancelButton />
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

const FieldErrorMessage = ({ error }: { error?: FieldError }) => {
  return (
    <span className="text-red-700">{error && <p>{error.message}</p>}</span>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-primary min-w-24"
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </button>
  );
};

const CancelButton = () => {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  return (
    <button
      className="btn btn-secondary min-w-24"
      type="button"
      onClick={onCancel}
    >
      Cancel
    </button>
  );
};
