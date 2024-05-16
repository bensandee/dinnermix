import { importRecipesAction } from "@/components/actions";

export default function Page() {
  return (
    <form action={importRecipesAction}>
      <div>
        <label className="label" htmlFor="file">
          CSV file
        </label>
        <input className="input" type="file" name="file" id="file" />
        <button className="btn btn-primary" type="submit">
          Upload File
        </button>
      </div>
    </form>
  );
}
