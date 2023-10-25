// MIT License

import { NextApiRequest } from "next";
import { ParsedUrlQuery } from "querystring";

// Copyright (c) 2023 Max Rogério

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// ref: https://gist.github.com/codeguy/6684588#gistcomment-3426313

export const slugify = (...args: any[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};

/** extracts slug from request with named argument "slug" */
export const slugFromRequest = (req: NextApiRequest): string | undefined => {
  const { slug } = req.query;
  if (slug == null) {
    return undefined;
  }
  if (Array.isArray(slug)) {
    return slug.join(" ");
  } else {
    return slug;
  }
};

/** extracts slug from query with named argument "slug" */
export const slugFromQuery = (query: ParsedUrlQuery): string | undefined => {
  const { slug } = query;
  if (slug == null) {
    return undefined;
  }
  if (Array.isArray(slug)) {
    return slug.join(" ");
  } else {
    return slug;
  }
};
