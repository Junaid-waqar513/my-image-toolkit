import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SEO from "../../seo/SEO";
import { blogPostSchema, breadcrumbSchema, combineSchemas } from "../../seo/schema";
import { getPostBySlug } from "../../data/blogPosts";

const SITE_URL = "https://project4-ashen-one.vercel.app";

function renderBlock(block, i) {
  if (block.type === "h2") {
    return (
      <h2 key={i} className="h4 fw-bold mt-4 mb-3">
        {block.text}
      </h2>
    );
  }

  if (block.type === "p") {
    return (
      <p key={i} className="mb-3" style={{ lineHeight: 1.75 }}>
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={i} className="mb-3" style={{ lineHeight: 1.75 }}>
        {block.items.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  }

  return null;
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={`${post.title} | ImageToolkit Blog`}
        description={post.description}
        keywords={post.keywords}
        canonical={url}
        schema={combineSchemas(
          blogPostSchema({
            title: post.title,
            description: post.description,
            url,
            datePublished: post.publishDate,
          }),
          breadcrumbSchema(post.title, url)
        )}
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          <nav aria-label="breadcrumb" className="mb-3">
            <Link to="/blog" className="text-decoration-none">
              ← Back to Blog
            </Link>
          </nav>

          <p className="text-muted small mb-2">
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime}
          </p>

          <h1 className="fw-bold mb-4">{post.title}</h1>

          <article>
            {post.content.map((block, i) => renderBlock(block, i))}
          </article>

          {post.relatedTool && (
            <div className="border rounded-4 p-4 mt-5 bg-light">
              <p className="mb-2 fw-semibold">
                Ready to try it yourself?
              </p>
              <Link
                to={post.relatedTool.url}
                className="btn btn-primary rounded-pill px-4"
              >
                Open {post.relatedTool.name} →
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default BlogPost;