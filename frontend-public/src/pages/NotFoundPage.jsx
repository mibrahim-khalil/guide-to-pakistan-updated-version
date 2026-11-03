import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container page">
      <h1>404 - Not Found</h1>
      <p>This page does not exist.</p>
      <Link to="/destinations">Go to Destinations</Link>
    </section>
  );
}