import React from "react";
import JobCard from "./JobCard";

function JobsList({ jobs, loading }) {
  return (
    <section className="jobs-section">
      <h2 className="section-title">💼 Доступные заказы</h2>

      {loading ? (
        <div className="loading">
          <p>Загрузка заказов...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <p>Заказы не найдены</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobsList;
