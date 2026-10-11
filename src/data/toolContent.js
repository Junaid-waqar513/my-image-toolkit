// Educational copy shown beneath each tool (see Components/ToolInfoSection.jsx).
// Every entry is written for its specific tool and matches what the tool
// actually does — keep it that way if you change a tool's behaviour.

export const toolContent = {
  compress: {
    heading: "How Image Compression Works (and How to Get the Best Result)",
    sections: [
      {
        title: "What compression actually does",
        paragraphs: [
          "Compression makes an image file smaller by storing the same picture more efficiently. JPG and WEBP use lossy compression: they discard fine detail that the human eye is unlikely to notice, and the quality slider controls how aggressively they do it. PNG is lossless, so it keeps every pixel exactly and the slider has little effect on it. For big savings on photographs, JPG or WEBP is almost always the better choice.",
        ],
      },
      {
        title: "Choosing a quality setting",
        paragraphs: [
          "There is no single correct number. The right setting depends on where the image will be used. As a starting point:",
        ],
        list: [
          "95% for photography and anything you may print or edit again",
          "80% for websites and blog posts, which is the sweet spot for most photos",
          "60% for social media, where the platform recompresses your upload anyway",
          "30% for email attachments where small size matters more than detail",
        ],
      },
      {
        title: "Why smaller images matter",
        paragraphs: [
          "Images are usually the heaviest part of a web page. Oversized files slow down loading, use up visitors' mobile data, and are one of the most common reasons a page scores badly on speed tests. Page speed is also a factor in how search engines rank a page, so compressing images before you upload them is one of the easiest improvements you can make.",
        ],
      },
      {
        title: "Private by design",
        paragraphs: [
          "Compression runs entirely inside your browser using the Canvas API and a compression library. Files up to 20 MB each are supported, you can add several at once, and nothing is ever uploaded to a server. That also means it works fast, because there is no waiting for an upload to finish.",
        ],
      },
    ],
    links: [
      { text: "Compress without losing quality", to: "/blog/how-to-compress-images-without-losing-quality" },
      { text: "Best image size for websites", to: "/blog/best-image-size-for-websites" },
    ],
  },

  resize: {
    heading: "A Practical Guide to Resizing Images",
    sections: [
      {
        title: "Resizing changes pixels, not just file size",
        paragraphs: [
          "Resizing changes the width and height of an image in pixels. File size follows indirectly: halving both the width and the height leaves only a quarter of the pixels, so the file usually becomes much smaller too. If a form or website complains that your photo is too big, resizing is often the most effective fix.",
        ],
      },
      {
        title: "Common target sizes",
        list: [
          "Instagram feed post: 1080 × 1080 px (square) or 1080 × 1350 px (portrait)",
          "Instagram or Facebook story: 1080 × 1920 px",
          "YouTube thumbnail: 1280 × 720 px",
          "Full HD wallpaper or slide: 1920 × 1080 px",
          "Blog or article image: around 1200 px wide is plenty for most layouts",
        ],
      },
      {
        title: "Keep the proportions yourself",
        paragraphs: [
          "Width and height are set independently, so entering numbers that do not match your photo's shape will stretch it. To keep the proportions, work out the new height with this formula: new height = new width × (original height ÷ original width). For example, a 4000 × 3000 photo resized to 1200 px wide should be 900 px tall.",
        ],
      },
      {
        title: "Shrinking is safe, enlarging has limits",
        paragraphs: [
          "Making an image smaller keeps it sharp. Making it larger cannot add detail that was never captured, so the browser estimates the new pixels and the result looks softer. A modest increase is fine, but doubling or tripling the size will be noticeably blurry. Everything happens locally in your browser, so your photos are never uploaded.",
        ],
      },
    ],
    links: [
      { text: "Resize for Instagram, Facebook and LinkedIn", to: "/blog/how-to-resize-images-for-instagram-facebook-linkedin" },
      { text: "Resize an image under 2MB", to: "/blog/how-to-resize-image-under-2mb" },
    ],
  },

  convert: {
    heading: "Choosing the Right Image Format",
    sections: [
      {
        title: "What each format is good for",
        list: [
          "JPG: the standard for photographs. Small files, but no transparency.",
          "PNG: best for logos, icons and screenshots. Lossless and supports transparency, but files are large for photos.",
          "WEBP: a modern format that is usually smaller than both JPG and PNG and supports transparency. Ideal for websites.",
          "BMP: an old uncompressed format. Files are very large, so use it only when a legacy program requires it.",
        ],
      },
      {
        title: "When converting makes sense",
        paragraphs: [
          "Converting a PNG photo or screenshot to JPG or WEBP often shrinks it dramatically. Going the other way does not improve anything: turning a JPG into a PNG cannot restore detail that was already lost, it just creates a bigger file. Convert when you need compatibility (for example, a site that only accepts JPG) or a smaller size.",
        ],
      },
      {
        title: "The transparency pitfall",
        paragraphs: [
          "JPG cannot store transparency. When you convert a transparent PNG to JPG, the see-through areas are filled with solid white. If you need to keep a transparent background, convert to PNG or WEBP instead.",
        ],
      },
      {
        title: "A note on quality",
        paragraphs: [
          "Converting to a lossy format such as JPG or WEBP re-encodes the image, which can lower quality slightly. Avoid converting the same file back and forth repeatedly, and keep your original. Conversion runs in your browser, so nothing is uploaded.",
        ],
      },
    ],
    links: [
      { text: "JPG vs PNG vs WEBP", to: "/blog/jpg-vs-png-vs-webp-best-image-format-2026" },
      { text: "Convert HEIC to JPG", to: "/blog/how-to-convert-heic-to-jpg" },
    ],
  },

  crop: {
    heading: "Cropping Photos for Profiles, Thumbnails and Product Shots",
    sections: [
      {
        title: "What this tool does",
        paragraphs: [
          "Drag the image to position it, use the zoom control to get closer, and the tool crops to a square (1:1) frame. Square crops are what most profile pictures, avatars, app icons and marketplace product listings require. If you need a different shape, you can crop to a square here and then adjust dimensions with the Resize tool.",
        ],
      },
      {
        title: "Composition tips",
        list: [
          "Place the subject off-centre when it suits the photo. The rule of thirds often looks more natural than dead centre.",
          "For portraits, keep the eyes in the upper third of the frame.",
          "Crop out distractions at the edges, such as stray objects or half-cut people.",
          "Leave a little breathing room around the subject so the result does not feel cramped.",
        ],
      },
      {
        title: "Crop first, then resize",
        paragraphs: [
          "Do your cropping before you resize or compress. Cropping a full-resolution original keeps the most detail, whereas cropping a photo you have already shrunk leaves you with fewer pixels to work with. Cropping also removes parts of the image you no longer need, which reduces file size.",
        ],
      },
      {
        title: "Your photos stay on your device",
        paragraphs: [
          "The crop is calculated and saved by your browser. Your image is never uploaded to a server, which matters when the photo is a personal portrait or a private document.",
        ],
      },
    ],
    links: [
      { text: "How to crop photos perfectly", to: "/blog/how-to-crop-photos-perfectly-social-media-print" },
    ],
  },

  rotate: {
    heading: "Fixing Sideways and Upside-Down Photos",
    sections: [
      {
        title: "Why photos show up rotated",
        paragraphs: [
          "Phones often save a photo in its original sensor orientation and add a small piece of metadata telling apps how to display it. Some programs respect that tag and some ignore it, so the same picture can look correct in one place and sideways in another. Rotating the image itself fixes it everywhere.",
        ],
      },
      {
        title: "Which angle should you pick?",
        list: [
          "90° clockwise turns a sideways photo upright when the top of the picture points left.",
          "270° (the same as 90° anticlockwise) fixes the opposite case, when the top points right.",
          "180° corrects a photo that is completely upside down.",
        ],
      },
      {
        title: "The rotation is saved into the file",
        paragraphs: [
          "The tool turns the actual pixels rather than setting a flag, so the corrected image displays properly in every app, website and document you use it in. Because the file is saved again, a JPG goes through one more round of compression. Avoid rotating the same JPG many times and keep your original if quality matters.",
        ],
      },
      {
        title: "Private and instant",
        paragraphs: [
          "Rotation happens in your browser, so there is nothing to upload and nothing waiting on a server.",
        ],
      },
    ],
    links: [
      { text: "Why is my photo sideways?", to: "/blog/how-to-fix-sideways-rotated-photos" },
    ],
  },

  flip: {
    heading: "When to Mirror or Flip an Image",
    sections: [
      {
        title: "Horizontal and vertical flips",
        paragraphs: [
          "A horizontal flip mirrors the image left to right, like looking at it in a mirror. A vertical flip mirrors it top to bottom. Neither is the same as rotating: a flip produces a mirror image, while a rotation only turns the picture around.",
        ],
      },
      {
        title: "Common reasons to flip",
        list: [
          "Selfies saved the wrong way round, where text on clothing or signs reads backwards",
          "Design layouts where you want a person or object to face into the page",
          "Creating a reflection or symmetrical effect",
          "Matching the direction of two photos used side by side",
        ],
      },
      {
        title: "Things to watch out for",
        paragraphs: [
          "Flipping reverses any text, logos and numbers in the picture, so check signs, shirts and screens before you publish. Be careful with images where direction carries meaning, such as maps, product labels or documents, and avoid flipping a photo in a way that misrepresents what it shows.",
        ],
      },
      {
        title: "Done locally",
        paragraphs: [
          "The flip is applied by your browser and saved as a new file. Your original is not touched and nothing is uploaded.",
        ],
      },
    ],
  },

  watermark: {
    heading: "Adding a Text Watermark to Protect Your Images",
    sections: [
      {
        title: "Why add a watermark?",
        paragraphs: [
          "A watermark credits you as the creator and discourages casual reuse of your photos, whether they are product shots, portfolio work or original artwork. It also keeps your name or website attached to the image when it gets shared.",
        ],
      },
      {
        title: "Choosing good watermark text",
        list: [
          "Keep it short: a name, a website, or a handle such as @yourname",
          "A copyright symbol and year, for example © 2026 Your Name, makes ownership clear",
          "Pick text that is readable but does not dominate the photo",
        ],
      },
      {
        title: "What a watermark can and cannot do",
        paragraphs: [
          "A visible watermark deters casual copying, but it is not a lock. A determined person can crop or edit it out. For stronger protection, publish lower-resolution versions of your work and keep the high-resolution originals to yourself.",
        ],
      },
      {
        title: "Your originals stay private",
        paragraphs: [
          "The watermark is drawn onto a copy of your image inside your browser. The original is untouched, and neither file is uploaded anywhere. If you are sharing photos publicly, you may also want to remove hidden location data with the EXIF Metadata Remover.",
        ],
      },
    ],
    links: [
      { text: "How to add a watermark to photos", to: "/blog/how-to-add-watermark-to-photos" },
    ],
  },

  batch: {
    heading: "Processing Several Images at Once",
    sections: [
      {
        title: "What batch processing can do",
        paragraphs: [
          "Instead of editing photos one at a time, you can apply the same operations to a group in a single pass. Batch processing can combine resizing, compression, format conversion and watermarking, so a whole set of images comes out consistent.",
        ],
      },
      {
        title: "How many images can I process?",
        paragraphs: [
          "The free toolkit processes up to 5 images per batch, entirely inside your browser. If you drop in more, you will be asked whether to process the first 5. You can always run another batch afterwards.",
        ],
      },
      {
        title: "A sample workflow",
        paragraphs: [
          "Preparing product photos for a website is a good example. Resize them to about 1200 px wide, convert them to WEBP, and compress at around 80%. Doing that in one pass keeps every image the same size and format, and the files load much faster than the originals.",
        ],
      },
      {
        title: "Tips for better results",
        list: [
          "Group similar images together, for example photos from the same camera",
          "Check one result before running a large set",
          "Keep your originals in case you need a different size later",
        ],
      },
      {
        title: "Still private",
        paragraphs: [
          "Every image is processed on your own device. Nothing is uploaded, no matter how many files you add.",
        ],
      },
    ],
    links: [
      { text: "How to batch compress images", to: "/blog/how-to-batch-compress-images" },
    ],
  },

  pdf: {
    heading: "Turning Images into a PDF",
    sections: [
      {
        title: "Common uses",
        paragraphs: [
          "Combining images into one PDF is handy for scanned documents, receipts, homework and assignments, ID copies for applications, and simple portfolios. Instead of attaching a pile of separate pictures, you send one tidy file.",
        ],
      },
      {
        title: "Page options explained",
        list: [
          "Page size: A4, US Letter, or the original size of your image",
          "Orientation: automatic, portrait or landscape, so wide images are not squeezed onto tall pages",
          "Fit: how each image is scaled to sit on its page",
          "Margin: the white border around each image",
        ],
      },
      {
        title: "A4 or Letter?",
        paragraphs: [
          "A4 is the standard paper size in most countries, while US Letter is used in the United States and Canada. Choose the one your printer or recipient uses. If you are not printing, either works, or you can pick the original image size to avoid any scaling.",
        ],
      },
      {
        title: "Keep the file size manageable",
        paragraphs: [
          "A PDF made from large photos can become very big. If you need to email it or upload it to a portal with a size limit, compress or resize the images first.",
        ],
      },
      {
        title: "Safe for sensitive documents",
        paragraphs: [
          "The PDF is built inside your browser, so identity documents, forms and personal photos are never uploaded to a server.",
        ],
      },
    ],
    links: [
      { text: "How to convert images to PDF", to: "/blog/how-to-convert-images-to-pdf" },
    ],
  },

  exif: {
    heading: "What Photo Metadata Reveals and How to Remove It",
    sections: [
      {
        title: "What is hidden inside a photo?",
        paragraphs: [
          "Most photos carry EXIF metadata added by the camera or phone. It can include the device make and model, the lens, the date and time the photo was taken, the software used, and, if location services were on, the GPS coordinates of where you were standing.",
        ],
      },
      {
        title: "Why you might want to remove it",
        paragraphs: [
          "GPS coordinates in a photo taken at home can reveal your address to anyone who downloads the file. Timestamps and device details can also say more about you than you intend. Removing metadata before you share an image is a simple privacy habit.",
        ],
      },
      {
        title: "How this tool works",
        paragraphs: [
          "The tool first reads the metadata so you can see exactly what your photo contains. It then redraws the image onto a blank canvas and saves a fresh copy. Metadata is not carried over in that process, so the new file contains the picture only. The image looks the same, because only the hidden data is dropped.",
        ],
      },
      {
        title: "Do platforms strip it for me?",
        paragraphs: [
          "Some social networks remove location data when you upload, but you should not rely on it, especially for email attachments, files sent directly, forum posts and marketplace listings. Cleaning the file yourself first is safer.",
        ],
      },
      {
        title: "Nothing is uploaded",
        paragraphs: [
          "Reading and removing metadata happens entirely in your browser. Your photos, and the private details inside them, never leave your device.",
        ],
      },
    ],
    links: [
      { text: "What is EXIF data?", to: "/blog/what-is-exif-data-why-remove-it" },
      { text: "Remove GPS location from photos", to: "/blog/how-to-remove-gps-location-from-photos" },
    ],
  },

  health: {
    heading: "Understanding Your Image Health Score",
    sections: [
      {
        title: "What the checker looks at",
        paragraphs: [
          "The Image Health Checker inspects each image's file size, pixel dimensions and format, estimates how efficiently it is compressed, and gives basic SEO suggestions. The result is a score you can use to decide whether an image is ready for the web.",
        ],
      },
      {
        title: "Why image health matters",
        paragraphs: [
          "On many pages the largest element a visitor waits for is an image. Heavy or oversized files slow that down, which hurts the experience on mobile connections and can affect how well the page performs in search.",
        ],
      },
      {
        title: "How to act on the results",
        list: [
          "File size too large: run it through Compress Image",
          "Dimensions much bigger than the space it is shown in: use Resize Image",
          "Old or heavy format: convert photos to WEBP or JPG with Convert Image",
        ],
      },
      {
        title: "A few rules of thumb",
        paragraphs: [
          "Many web images work well under roughly 100 to 200 KB, and there is rarely a reason to upload a photo wider than the largest size it will be displayed at. Descriptive file names and meaningful alt text also help search engines and screen readers understand what an image shows.",
        ],
      },
      {
        title: "Checked privately",
        paragraphs: [
          "The analysis runs in your browser. Your images are not uploaded to be checked.",
        ],
      },
    ],
    links: [
      { text: "Image Health Checker guide", to: "/blog/image-health-checker-guide" },
      { text: "Image optimization for SEO", to: "/blog/image-optimization-for-seo" },
    ],
  },

  seo: {
    heading: "How to Use the SEO & Keyword Checker",
    sections: [
      {
        title: "Start with the title and meta description",
        paragraphs: [
          "Search results show only a limited number of characters. A title of roughly 30 to 60 characters usually displays in full, while very short titles waste space and long ones get cut off. The meta description has a similar limit, and a clear, specific one encourages more people to click.",
        ],
      },
      {
        title: "Keyword density",
        paragraphs: [
          "Keyword density is how often your focus keyword appears compared with the total word count. A level of roughly 1% to 2.5% tells search engines what the page is about without looking forced. Repeating a phrase far more often than that reads badly and can look like keyword stuffing.",
        ],
      },
      {
        title: "Readability",
        paragraphs: [
          "The tool calculates the Flesch Reading Ease score from your average sentence length and word length. Higher scores are easier to read, and scores around 60 to 70 correspond to plain English that most people follow comfortably. Short sentences and everyday words usually raise the score.",
        ],
      },
      {
        title: "Use it as a guide, not a rulebook",
        paragraphs: [
          "No score guarantees a ranking. Write for your readers first, then use the checker to catch obvious problems such as a missing keyword, a truncated title or dense paragraphs.",
        ],
      },
      {
        title: "Your drafts stay private",
        paragraphs: [
          "Everything is analysed in your browser. Your text, titles and keywords are never sent to a server or stored.",
        ],
      },
    ],
    links: [
      { text: "How to check blog post SEO before publishing", to: "/blog/how-to-check-blog-post-seo-before-publishing" },
    ],
  },

  c50: {
    heading: "Getting an Image Under 50KB",
    sections: [
      {
        title: "Where the 50KB limit comes up",
        paragraphs: [
          "Many exam registrations, government portals, job applications and older web forms cap photo uploads at a small size such as 50KB. These limits are strict, and the form will simply reject anything larger.",
        ],
      },
      {
        title: "How to get a good result",
        list: [
          "Resize first. A photo around 600 × 800 px compresses far more gracefully than a 4000 px original.",
          "Use JPG for photographs. PNG is rarely able to reach such a small size without losing quality.",
          "Plain backgrounds compress better than busy, detailed ones.",
          "Start from the original file, not a copy that has already been compressed several times.",
        ],
      },
      {
        title: "What if it cannot reach 50KB?",
        paragraphs: [
          "Very large or very detailed images may hit a quality floor before reaching the target. In that case the tool keeps the smallest reasonable result and tells you, instead of producing an unusable image. Resizing the photo to smaller dimensions first will usually solve it.",
        ],
      },
      {
        title: "Mind the other requirements",
        paragraphs: [
          "Many forms also require exact pixel dimensions or a specific format. Check the instructions, use the Resize Image tool for the dimensions, and then compress.",
        ],
      },
      {
        title: "Safe for ID photos",
        paragraphs: [
          "Passport-style and ID photos are sensitive. Compression happens entirely in your browser, so your photo is never uploaded to our servers.",
        ],
      },
    ],
    links: [
      { text: "Resize an image under 2MB", to: "/blog/how-to-resize-image-under-2mb" },
    ],
  },

  c100: {
    heading: "Getting an Image Under 100KB",
    sections: [
      {
        title: "Why 100KB is a popular limit",
        paragraphs: [
          "A 100KB cap is common for profile pictures, forum avatars, job application photos and content management system uploads. It is small enough to load quickly yet large enough to keep most photos looking clean.",
        ],
      },
      {
        title: "What to expect",
        paragraphs: [
          "A typical photo of around 1200 × 800 px can often be brought to 100KB with little visible loss. A very high-resolution original, such as a 4000 px camera photo, has far more detail to squeeze into the same budget, so you will see more compression unless you shrink the dimensions first.",
        ],
      },
      {
        title: "Tips for the best quality at 100KB",
        list: [
          "Resize to the size you actually need before compressing",
          "Choose JPG or WEBP for photos rather than PNG",
          "Crop away unneeded areas so the file only holds what matters",
          "Compress the original once instead of re-compressing an already compressed copy",
        ],
      },
      {
        title: "This tool versus the quality slider",
        paragraphs: [
          "With the regular compressor you pick a quality percentage and the resulting size varies from image to image. Here you set the destination, 100KB, and the tool searches for the quality that gets closest to it. That makes it ideal when a website gives you a hard maximum.",
        ],
      },
      {
        title: "Handled privately",
        paragraphs: [
          "Each image is compressed in your browser and never uploaded. You can process several files and download them together as a ZIP.",
        ],
      },
    ],
    links: [
      { text: "Compress images without losing quality", to: "/blog/how-to-compress-images-without-losing-quality" },
    ],
  },

  favicon: {
    heading: "A Quick Guide to Favicons and App Icons",
    sections: [
      {
        title: "What each file is for",
        list: [
          "favicon.ico, 16×16 and 32×32: the small icon in browser tabs and bookmarks",
          "48×48: Windows desktop and taskbar shortcuts",
          "180×180 apple-touch-icon: the icon used when someone adds your site to an iPhone or iPad home screen",
          "192×192 and 512×512: the icons Android and installable web apps (PWAs) require in the web manifest",
        ],
      },
      {
        title: "Designing an icon that works",
        paragraphs: [
          "Favicons are tiny, so simple wins. Use a bold, high-contrast shape or a single letter, avoid thin lines and small text, and check that it is still recognisable when shrunk to 16 pixels. Start from a square image of at least 512 × 512 px so the larger sizes stay sharp.",
        ],
      },
      {
        title: "A note about transparency",
        paragraphs: [
          "Transparent backgrounds work well for browser tabs, but iOS fills transparent areas of the home screen icon with a solid colour, which is often black. If that matters to you, use a source image with a solid background.",
        ],
      },
      {
        title: "How to install the files",
        paragraphs: [
          "Unzip the pack and place the files in the root of your website. In a Vite or React project, that is the public folder. Then paste the contents of the included head-snippet.html file inside the head tag of your page, and make sure the site.webmanifest file is reachable. Browsers may cache old icons, so a hard refresh helps when testing.",
        ],
      },
      {
        title: "Your logo stays with you",
        paragraphs: [
          "Every icon is generated in your browser and the ZIP is assembled locally. Your logo is never uploaded to a server.",
        ],
      },
    ],
  },
};
