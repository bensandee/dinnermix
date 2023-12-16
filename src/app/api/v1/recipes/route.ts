import { requireSessionUser } from "@/lib/auth";
import fs from "fs/promises";
import { checkRecipeOwnership } from "@/lib/db/security";

export const POST = async (request: Request) => {
  const user = await requireSessionUser();
  const formData = await request.formData();
  const contentType = formData.get("contentType") as string | null;
  const recipeId = formData.get("recipeId") as string | null;
  const file = formData.get("image") as File | null;
  if (!file || recipeId == null || contentType == null) {
    return new Response("Badly formed request", { status: 400 });
  }

  const isOwner = await checkRecipeOwnership({
    userId: user.id,
    recipeId: parseInt(recipeId),
  });
  if (!isOwner) {
    return new Response("No access, not owner", { status: 401 });
  }

  // create a temporary directory name
  const tempDir = await fs.mkdtemp("nextjs-");

  // and write them to the temporary directory
  if (file instanceof Blob) {
    const path = `${tempDir}/${file.name}`;
    const buffer = await file.arrayBuffer();
    await fs.writeFile(path, Buffer.from(buffer));
  }
};
