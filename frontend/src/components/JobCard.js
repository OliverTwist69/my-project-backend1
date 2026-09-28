import React from "react";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <div className="job-price">${job.price}</div>
      <p className="job-description">
        {job.description || "Нет описания"}
      </p>
      <div className="job-footer">
        <button className="btn-primary btn-small">
          Откликнуться
        </button>
      </div>
    </div>
  );
}

export default JobCard;
