"use client";

import { useRef } from "react";
import { IconButton } from "../IconButton";
import { deleteRecipeAction } from "../../actions";
import { Recipe } from "@/lib/db/schema";

export type RecipeProps = { recipe: Recipe };

export const RecipeName = ({ recipe }: RecipeProps) => {
  if (recipe.url != null) {
    return (
      <a className="link-primary" href={recipe.url}>
        {recipe.name}
      </a>
    );
  } else {
    return <>{recipe.name}</>;
  }
};

export const DeleteRecipeButton = ({ recipe }: RecipeProps) => {
  const deleteModal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <IconButton
        icon="delete"
        onClick={() => {
          deleteModal.current?.showModal();
        }}
      />
      <dialog className="modal" ref={deleteModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete recipe?</h3>
          <p className="py-4">{`Do you want to delete the recipe named "${recipe.name}"?`}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral">Cancel</button>
            </form>
            <form action={deleteRecipeAction}>
              <button className="btn btn-warning">Delete</button>
              <input type="hidden" name="recipeId" value={recipe.id} />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
