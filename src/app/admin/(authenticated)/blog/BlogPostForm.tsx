"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@prisma/client";
import { Save, CheckCircle } from "lucide-react";
import {
  createBlogPost,
  updateBlogPost,
  type BlogFormState,
} from "@/server/actions/blog";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/admin/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";

const initialState: BlogFormState = { ok: false };

function toDateInputValue(d: Date | null | undefined): string {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  // YYYY-MM-DDTHH:mm — what <input type="datetime-local"> expects.
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(
    dt.getHours()
  )}:${pad(dt.getMinutes())}`;
}

export function BlogPostForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const action = isEdit ? updateBlogPost.bind(null, initial!.id) : createBlogPost;

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? null);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="coverUrl" value={coverUrl ?? ""} />

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Title" error={err.title?.[0]}>
            <input
              name="title"
              defaultValue={initial?.title ?? ""}
              className={inputClass}
              required
            />
          </FormField>
          <FormField
            label="Slug"
            error={err.slug?.[0]}
            hint="URL path, e.g. perth-event-security-guide"
          >
            <input
              name="slug"
              defaultValue={initial?.slug ?? ""}
              className={`${inputClass} font-mono`}
              required
            />
          </FormField>
        </div>

        <FormField
          label="Excerpt"
          error={err.excerpt?.[0]}
          hint="1–2 sentences. Shown on the blog listing + used as a meta description fallback."
        >
          <textarea
            name="excerpt"
            defaultValue={initial?.excerpt ?? ""}
            className={textareaClass}
            rows={2}
            required
          />
        </FormField>

        <FormField
          label="Content"
          error={err.content?.[0]}
          hint="Plain text with blank lines between paragraphs. Lines starting with ## or ### become headings; lines starting with - become list items."
        >
          <textarea
            name="content"
            defaultValue={initial?.content ?? ""}
            className={`${textareaClass} font-mono text-sm`}
            rows={20}
            required
          />
        </FormField>
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Cover Image</h2>
        <ImageUpload
          folder="general"
          label="Cover image"
          value={coverUrl}
          onChange={setCoverUrl}
          recommendedSize="1600×900"
          recommendedDimensions="16:9 landscape"
          maxSizeMB={2}
        />
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Meta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label="Category" error={err.category?.[0]} hint='e.g. "Industry Insight"'>
            <input
              name="category"
              defaultValue={initial?.category ?? ""}
              className={inputClass}
            />
          </FormField>
          <FormField label="Tags" error={err.tags?.[0]} hint="Comma-separated">
            <input
              name="tags"
              defaultValue={initial?.tags ?? ""}
              placeholder="security, perth, events"
              className={inputClass}
            />
          </FormField>
          <FormField label="Author" error={err.authorName?.[0]}>
            <input
              name="authorName"
              defaultValue={initial?.authorName ?? ""}
              placeholder="G-Unit Security"
              className={inputClass}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label="Read time (min)" error={err.readMinutes?.[0]}>
            <input
              type="number"
              name="readMinutes"
              defaultValue={initial?.readMinutes ?? 5}
              min={1}
              max={120}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Publish date"
            error={err.publishedAt?.[0]}
            hint="Leave blank to auto-stamp when published."
          >
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={toDateInputValue(initial?.publishedAt)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Status">
            <label className="flex items-center gap-2 h-[42px]">
              <input
                type="checkbox"
                name="published"
                defaultChecked={initial?.published ?? false}
                className="w-4 h-4 accent-red-bright"
              />
              <span className="text-sm">Published</span>
            </label>
          </FormField>
        </div>
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">SEO Overrides</h2>
        <p className="text-xs text-gray-mid -mt-2">
          Optional. If blank, Title + Excerpt are used.
        </p>
        <FormField label="Meta Title" error={err.metaTitle?.[0]} hint="Up to ~60 chars for Google.">
          <input
            name="metaTitle"
            defaultValue={initial?.metaTitle ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Meta Description"
          error={err.metaDescription?.[0]}
          hint="Up to ~155 chars."
        >
          <textarea
            name="metaDescription"
            defaultValue={initial?.metaDescription ?? ""}
            className={textareaClass}
            rows={2}
          />
        </FormField>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          <Save className="w-3.5 h-3.5" />
          {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="text-gray-mid hover:text-off-white text-sm"
        >
          Cancel
        </button>
        {state.ok && isEdit && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" /> {state.message}
          </span>
        )}
        {!state.ok && state.message && (
          <span className="text-red-bright text-sm">{state.message}</span>
        )}
      </div>
    </form>
  );
}
