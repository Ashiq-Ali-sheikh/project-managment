import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getStatusColor } from "../helper";
const ProjectTable = ({ projects, handleDelete }) => {
    const formateDate=(date)=>{
      return  new Date(date).toLocaleDateString()
    }
  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>Title</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects?.length > 0 ? (
          projects.map((project) => (
            <tr key={project._id}>
              <td>{project.title}</td>
              <td>{formateDate(project.startDate)}</td>
              <td>{formateDate(project.endDate)}</td>
              <td className={getStatusColor(project.status)}>{project.status}</td>
              <td className="d-flex flex-column flex-md-row">
                <Button
                  variant="warning"
                  as={Link}
                  to={`/edit-project/${project._id}`}
                  className="mb-2 mb-md-0 me-md-2"
                  style={{
                   
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    borderRadius: "0.25rem",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  <Icon
                    icon="mingcute:edit-2-line"
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "1.25rem",
                    }}
                  />
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(project._id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    borderRadius: "0.25rem",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                   
                  }}
                >
                  <Icon
                    icon="mingcute:delete-2-line"
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "1.25rem",
                    }}
                  />
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No projects available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ProjectTable;
