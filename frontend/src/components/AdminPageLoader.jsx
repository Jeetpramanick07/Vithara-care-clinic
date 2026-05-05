export default function AdminPageLoader({
    title = "Loading",
    subtitle = "Preparing data",
    type = "table",
  }) {
    return (
      <div className="admin-loader">
        <div className="admin-loader__header">
          <div className="admin-loader__eyebrow shimmer" />
          <div className="admin-loader__title shimmer" />
          <div className="admin-loader__subtitle shimmer" />
        </div>
  
        {type === "dashboard" && (
          <>
            <div className="admin-loader__stats">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="admin-loader__stat-card shimmer-block">
                  <div className="admin-loader__stat-line short shimmer" />
                  <div className="admin-loader__stat-line medium shimmer" />
                </div>
              ))}
            </div>
  
            <div className="admin-loader__panel shimmer-block large" />
            <div className="admin-loader__panel shimmer-block medium" />
          </>
        )}
  
        {type === "table" && (
          <div className="admin-loader__table">
            <div className="admin-loader__table-head">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="admin-loader__th shimmer" />
              ))}
            </div>
  
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="admin-loader__tr">
                {[1, 2, 3, 4, 5].map((col) => (
                  <div key={col} className="admin-loader__td shimmer" />
                ))}
              </div>
            ))}
          </div>
        )}
  
        {type === "cards" && (
          <div className="admin-loader__cards">
            {[1, 2, 3].map((item) => (
              <div key={item} className="admin-loader__card shimmer-block">
                <div className="admin-loader__card-title shimmer" />
                <div className="admin-loader__card-line shimmer" />
                <div className="admin-loader__card-line shimmer" />
                <div className="admin-loader__card-line short shimmer" />
              </div>
            ))}
          </div>
        )}
  
        <div className="admin-loader__footer-text">
          <span className="admin-loader__spinner" />
          <p>
            {title} — {subtitle}
          </p>
        </div>
      </div>
    );
  }