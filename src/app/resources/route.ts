import { requireSessionUser } from "@/lib/auth";
import { checkAttachmentAccess } from "@/lib/db/security";

export const GET = async (request: Request) => {
  const user = await requireSessionUser();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id == null) {
    return new Response("Bad request, missing id", { status: 400 });
  }

  const hasAccess = await checkAttachmentAccess({
    userId: user.id,
    attachmentId: parseInt(id),
  });
  if (!hasAccess) {
    return new Response("No access", { status: 401 });
  }

  const data = getRouteData("");
  const response = new Response(data);
  response.headers.set("content-type", "image/png");
  return response;
};

const getRouteData = (_url: string) => {
  throw new Error();
};
