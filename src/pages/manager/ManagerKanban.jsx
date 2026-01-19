import { useEffect, useState } from "react";
import api from "../../api/axios";
import './ManagerKanban.css'

const STATUSES = [
  "CREATED",
  "IN_PROGRESS",
  "ISSUE_REPORTED",
  "DONE",
  "BILLED",
  "DELIVERED"
];

export default function ManagerKanban() {
  const [kanban, setKanban] = useState({});

  const fetchKanban = async () => {
    const res = await api.get("/jobcards/kanban");
    setKanban(res.data);
  };

  useEffect(() => {
    fetchKanban();
  }, []);

  return (
    <div
      className="kanban-board"
    >
      {STATUSES.map(status => (
        <div
          key={status}
          className={`kanban-column ${status}`}
          style={{
            minWidth: 260,
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fafafa"
          }}
        >
          <h4
            style={{
              textAlign: "center",
              background: "#eee",
              padding: 8
            }}
          >
             <div className="kanban-header">{status}</div>
          </h4>

          {kanban[status]?.length === 0 && (
            <p className="kanban-empty">
              No jobs
            </p>
          )}

          {kanban[status]?.map(job => (
            <div
              key={job._id}
              className="kanban-card"
            >
              <p><b>Vehicle:</b> {job.vehicleNumber}</p>
              <p><b>Customer:</b> {job.customerName}</p>
              <p><b>Phone:</b> {job.customerPhone}</p>
              <p><b>service Requested:</b> {job.status}</p>
              <p><b>service Requested:</b> {job.servicesRequested}</p>
              <p>
                <b>Technician:</b>{" "}
                 {job.assignedTechnician ? (
                     <span className="kanban-tech">{job.assignedTechnician.name}</span>
                      ) : (
                    <span className="kanban-unassigned">Not Assigned</span>
                  )}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
