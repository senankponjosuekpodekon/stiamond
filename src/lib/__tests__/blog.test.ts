import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

describe("blog lib", () => {
  it("returns an array of posts", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("posts have required fields", () => {
    const posts = getAllPosts();
    const post = posts[0];
    expect(post).toHaveProperty("slug");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("date");
    expect(post).toHaveProperty("excerpt");
    expect(post).toHaveProperty("content");
    expect(post).toHaveProperty("readingTime");
  });

  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i + 1].date).getTime()
      );
    }
  });

  it("returns a post by slug", () => {
    const post = getPostBySlug("building-ai-powered-software");
    expect(post).not.toBeNull();
    expect(post?.title).toBe("Building AI-Powered Software: A Practical Guide");
  });

  it("returns null for non-existent slug", () => {
    const post = getPostBySlug("does-not-exist");
    expect(post).toBeNull();
  });
});
