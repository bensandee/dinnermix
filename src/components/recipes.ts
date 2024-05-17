import { insertRecipeSchema } from "@/lib/db/schema";
import { parse as csvParse } from "csv-parse";
import { PassThrough } from "stream";
import { z } from "zod";

const singleRecordSchema = z.array(z.string());
const urlSchema = z.string().url();
const nameAndUrlMd = /\[(.+)\]\((.+)\)/;

export const simpleRecipeSchema = insertRecipeSchema.omit({
  slug: true,
  ownerId: true,
});
export type SimpleRecipe = z.infer<typeof simpleRecipeSchema>;

export const bulkInsertRecipeSchema = insertRecipeSchema.omit({ slug: true });
export type BulkInsertRecipe = z.infer<typeof bulkInsertRecipeSchema>;

export const importRecipesFromCsvBuffer = async (csvBuffer: Buffer) => {
  const bufferStream = new PassThrough();
  bufferStream.end(csvBuffer);
  const parser = bufferStream.pipe(csvParse({}));

  const retval: SimpleRecipe[] = [];
  for await (const record of parser) {
    console.log(JSON.stringify(record, null, 2));
    const parsedRecord = singleRecordSchema.safeParse(record);
    if (parsedRecord.success) {
      const newRecipe = parseRecipe(parsedRecord.data);
      if (newRecipe) {
        retval.push(newRecipe);
      }
    }
  }
  return retval;
};

export const parseRecipe = (r: string[]): SimpleRecipe | undefined => {
  if (r.length < 1) {
    return undefined;
  } else if (r.length === 1 || (r.length >= 2 && r[1] === "")) {
    const name = r[0].match(nameAndUrlMd);
    if (name) {
      const parsedUrl = urlSchema.safeParse(name[2]);
      if (parsedUrl.success) {
        return { name: name[1], url: parsedUrl.data };
      }
    }
    const parsed = urlSchema.safeParse(r[0]);
    if (parsed.success) {
      return { name: r[0], url: parsed.data };
    }
    return { name: r[0] };
  } else if (r.length >= 2) {
    const parsed = urlSchema.safeParse(r[1]);
    if (parsed.success) {
      return { name: r[0], url: parsed.data };
    }
  }
  return undefined;
};
