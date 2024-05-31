import {
  Container,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Spinner,
} from "react-bootstrap";
import ProjectTable from "./Table";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../slices/projectApiSlice";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-toastify";
import ProjectSearch from "./Search";
const Home = () => {
  const [deleteProject] = useDeleteProjectMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, error, isLoading, refetch } = useGetProjectsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [currentPage, itemsPerPage, refetch]);
  const filteredProjects =
    data?.projects?.filter((project) => {
      const matchesSearchTerm = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatusFilter = statusFilter
        ? project.status === statusFilter
        : true;
      return matchesSearchTerm && matchesStatusFilter;
    }) || [];

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleShowModal = (project) => {
    setCurrentProjectId(project);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    if (currentProjectId) {
      await handleDelete(currentProjectId);
    }
    setShowModal(false);
    setIsDeleting(false);
  };
  return (
    <div className=" py-5">
      <Container>
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <h1>Projects</h1>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end">
          <ProjectSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>
        </Row>
        <Button as={Link} to="/create-project" variant="dark" className="mb-3">
          Create Project
        </Button>
      </Container>

      {isLoading ? (
        <div className="spinner-container text-center justify-content-md-center align-items-center vh-100 mt-5">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span>Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div>Error loading projects</div>
      ) : (
        <>
          <ProjectTable
            projects={filteredProjects}
            handleDelete={handleShowModal}
          />
          <DeleteConfirmationModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
            isLoading={isDeleting}
          />
          <Pagination className="justify-content-center mt-3">
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              className="text-dark"
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-dark"
            />

            {[...Array(data.totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
                className="text-dark"
              >
                {number + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-dark"
            />
            <Pagination.Last
              onClick={() => setCurrentPage(data.totalPages)}
              className="text-dark"
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Home;
