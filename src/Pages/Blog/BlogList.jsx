import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SEO from "../../seo/SEO";
import { breadcrumbSchema, combineSchemas } from "../../seo/schema";
import { blogPosts } from "../../data/blogPosts";

function BlogList() {
  return (
    <>
      <SEO
        title="Blog — Image Tips & Guides | ImageToolkit"
        description="Practical guides on image formats, compression, and optimizing photos for the web — from the team behind ImageToolkit."
        keywords="image optimization blog, image compression tips, web image guides"
        canonical="https://project4-ashen-one.vercel.app/blog"
        schema={combineSchemas(
          breadcrumbSchema("Blog", "https://project4-ashen-one.vercel.app/blog")
        )}
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh" }}>

        <h1 className="fw-bold mb-2">ImageToolkit Blog</h1>
        <p className="text-muted mb-5" style={{ maxWidth: "650px" }}>
          Practical, no-nonsense guides on image formats, compression, and
          getting the best results from your photos.
        </p>

        <div className="row g-4">
          {blogPosts
            .slice()
            .reverse()
            .map((post) => (
              <div className="col-md-6" key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <p className="text-muted small mb-2">
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        · {post.readTime}
                      </p>
                      <h2 className="h5 fw-bold text-dark">
                        {post.title}
                      </h2>
                      <p className="text-muted mb-0">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

      </main>

      <Footer />
    </>
  );
}

export default BlogList;