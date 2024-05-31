import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Card, Row, Col, Spinner } from "react-bootstrap";
import { formatDate } from "../helper";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date must be greater than Start Date"),
  status: yup
    .string()
    .oneOf(["Not Started", "In Progress", "Completed"], "Invalid status")
    .required("Status is required"),
});

const ProjectForm = ({ onSubmit, defaultValues, isLoading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("title", defaultValues.title);
      setValue("description", defaultValues.description);
      setValue("startDate", formatDate(defaultValues.startDate));
      setValue("endDate", formatDate(defaultValues.endDate));
      setValue("status", defaultValues.status);
    }
  }, [defaultValues, setValue]);
  return (
    <Card className="p-4 shadow-sm bg-dark text-white">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project title"
            {...register("title")}
            isInvalid={!!errors.title}
            className="bg-dark text-white border-secondary"
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            {...register("description")}
            isInvalid={!!errors.description}
            className="bg-dark text-white border-secondary"
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                {...register("startDate")}
                isInvalid={!!errors.startDate}
                className="bg-dark text-white border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.startDate?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                {...register("endDate")}
                isInvalid={!!errors.endDate}
                className="bg-dark text-white border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            {...register("status")}
            isInvalid={!!errors.status}
            className="bg-dark text-white border-secondary"
          >
            <option value="">Select status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.status?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                {defaultValues ? "Updating..." : "Creating..."}
              </>
            ) : defaultValues ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ProjectForm;
