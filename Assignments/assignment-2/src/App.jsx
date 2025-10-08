import "./App.css";

const news = [
  {
    "title": "Flutter 5.0 Released with AI Integration",
    "description": "Google launches Flutter 5.0 featuring enhanced performance, AI-assisted widgets, and faster compilation for mobile and web apps.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "React 21 Brings Server Components to Production",
    "description": "The React team announces server components, enabling faster page loads and better SEO for React apps.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "Next.js 15 Improves Static Site Generation",
    "description": "Next.js introduces incremental static regeneration with optimized caching and faster builds for large-scale projects.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "JavaScript Frameworks Compare: React vs Vue vs Angular",
    "description": "A detailed performance and usability comparison for developers choosing the right framework in 2025.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "CSS Container Queries Now Supported in Major Browsers",
    "description": "Web developers can now write responsive CSS layouts based on container size instead of viewport size.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "TypeScript 6 Released with New Type Inference Features",
    "description": "The latest TypeScript version improves type inference, making large codebases safer and easier to maintain.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "Flutter Web Gains Desktop-Like Performance",
    "description": "Flutter's web support now matches desktop app performance with improved rendering and memory optimization.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "Next.js Adds AI-Powered Image Optimization",
    "description": "Next.js now automatically optimizes images using AI to reduce load times and improve SEO metrics.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "HTML 6 Draft Brings New Semantic Elements",
    "description": "The HTML working group proposes new elements for better accessibility and structured content.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  },
  {
    "title": "Modern JavaScript: ES2025 Features Overview",
    "description": "A guide to the latest ES2025 features including pattern matching, enhanced async functions, and more.",
    "image": "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
  }
];

function App() {
   return (
    <div>
      <h1 className="title">Latest News</h1>
      <div className="grid">
        {news.map((news) => (
          <div key={news.id} className="card">
            <img src={news.image} alt={news.title} />
            <div className="card-content">
              <h2>{news.title}</h2>
              <p>{news.description}</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
