export default function TourComparison({
  rows = [],
}) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  return (
    <section
      className="tourComparison"
      aria-label="Tour comparison"
    >
      <div className="tourComparison__head">
        <div>
          <div className="tourComparison__eyebrow">
            Compare Packages
          </div>

          <h2 className="tourComparison__title">
            Find the right tour for your journey
          </h2>

          <p className="tourComparison__subtitle">
            Compare duration, group size, ratings, and prices before booking.
          </p>
        </div>
      </div>

      <div className="tourComparison__tableWrap">
        <table className="tourComparison__table">
          <thead>
            <tr>
              <th scope="col">Tour</th>
              <th scope="col">Duration</th>
              <th scope="col">Group Size</th>
              <th scope="col">Rating</th>
              <th scope="col">Starting Price</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.tour}>
                <th scope="row">
                  {row.tour}
                </th>

                <td>{row.duration}</td>
                <td>{row.group}</td>

                <td>
                  <span className="tourComparison__rating">
                    <span aria-hidden="true">★</span>
                    {row.rating}
                  </span>
                </td>

                <td>
                  <strong>{row.price}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}