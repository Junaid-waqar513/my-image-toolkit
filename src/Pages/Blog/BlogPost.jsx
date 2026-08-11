import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SEO from "../../seo/SEO";
import {
  blogPostSchema,
  breadcrumbSchema,
  combineSchemas,
} from "../../seo/schema";
import { getPostBySlug } from "../../data/blogPosts";

const SITE_URL = "https://project4-ashen-one.vercel.app";

function renderBlock(block, i) {
  // =====================================================
  // HEADING
  // =====================================================

  if (block.type === "h2") {
    return (
      <h2 key={i} className="h4 fw-bold mt-4 mb-3">
        {block.text}
      </h2>
    );
  }

  // =====================================================
  // PARAGRAPH
  // =====================================================

  if (block.type === "p") {
    return (
      <p
        key={i}
        className="mb-3"
        style={{
          lineHeight: 1.75,
        }}
      >
        {block.text}
      </p>
    );
  }

  // =====================================================
  // LIST
  // =====================================================

  if (block.type === "list") {
    return (
      <ul
        key={i}
        className="mb-3"
        style={{
          lineHeight: 1.75,
        }}
      >
        {block.items.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  }

  // =====================================================
  // INTERNAL LINKS
  // =====================================================

  if (block.type === "links") {
    return (
      <div key={i} className="my-4">
        {block.title && (
          <h3 className="h5 fw-bold mb-3">
            {block.title}
          </h3>
        )}

        <div className="row g-3">
          {block.links.map((link, j) => (
            <div
              key={j}
              className="col-md-6"
            >
              <Link
                to={link.url}
                className="text-decoration-none"
              >
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-3">
                    <div className="fw-bold text-primary">
                      {link.title}
                    </div>

                    {link.description && (
                      <p className="small text-muted mb-0 mt-2">
                        {link.description}
                      </p>
                    )}

                    <div className="small fw-semibold mt-2">
                      Try it →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
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

      <main
        className="container py-5"
        style={{
          minHeight: "60vh",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {/* =================================================
              BACK TO BLOG
          ================================================= */}

          <nav
            aria-label="breadcrumb"
            className="mb-3"
          >
            <Link
              to="/blog"
              className="text-decoration-none"
            >
              ← Back to Blog
            </Link>
          </nav>

          {/* =================================================
              DATE
          ================================================= */}

          <p className="text-muted small mb-2">
            {new Date(
              post.publishDate
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime}
          </p>

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="fw-bold mb-4">
            {post.title}
          </h1>

          {/* =================================================
              ARTICLE CONTENT
          ================================================= */}

          <article>
            {post.content.map(
              (block, i) =>
                renderBlock(block, i)
            )}
          </article>

          {/* =================================================
              RELATED TOOL
          ================================================= */}

          {post.relatedTool && (
            <div className="border rounded-4 p-4 mt-5 bg-light">
              <p className="mb-2 fw-semibold">
                Ready to try it yourself?
              </p>

              <p className="text-muted mb-3">
                Use our free{" "}
                <strong>
                  {post.relatedTool.name}
                </strong>{" "}
                directly in your browser.
              </p>

              <Link
                to={post.relatedTool.url}
                className="btn btn-primary rounded-pill px-4"
              >
                Open {post.relatedTool.name} →
              </Link>
            </div>
          )}

          {/* =================================================
              BACK TO BLOG
          ================================================= */}

          <div className="text-center mt-5">
            <Link
              to="/blog"
              className="btn btn-outline-primary rounded-pill px-4"
            >
              ← More Articles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BlogPost;