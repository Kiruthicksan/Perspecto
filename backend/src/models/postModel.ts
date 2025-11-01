import mongoose, { Document, Schema } from "mongoose";

export interface IPOST extends Document {
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
  slug: string;
}

const postSchema = new Schema<IPOST>(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// -----------------------  pre save hook for creating slug --------------------

postSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

export const Post = mongoose.model("Post", postSchema);
