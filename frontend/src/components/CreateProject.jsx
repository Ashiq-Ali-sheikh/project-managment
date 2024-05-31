import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Container, Row, Col } from "react-bootstrap";
import { useCreateProjectMutation } from "../slices/projectApiSlice";
import { createProjectSuccess } from "../slices/projectSlice";
import { toast } from "react-toastify";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const onSubmit = async (data) => {
    const res = await createProject(data);
    if (res.error) {
      toast.error(res.error.data.message);
      return;
    }
    dispatch(createProjectSuccess({ ...res.data }));
    toast.success("Project created");
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mb-4 text-center text-black display-4 font-weight-bold ">
            Create Project
          </h1>

          <ProjectForm onSubmit={onSubmit} isLoading={isCreating} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;
