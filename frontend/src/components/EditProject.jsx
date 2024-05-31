
import { useParams, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useGetProjectQuery, useUpdateProjectMutation } from '../slices/projectApiSlice';
import { toast } from 'react-toastify';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, isError } = useGetProjectQuery(id);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
 
  const onSubmit = async(data) => {
   let res= await  updateProject({...data,_id:id})
    if(res?.error){
        toast.error(res.error.data.message)
        return
    }
    toast.success("Project updated successfully")
    navigate('/');
  };

  return (
    <Container >
     <Row className="justify-content-md-center align-items-center vh-90">
  <Col md={8} >
    {isLoading ? (
      <div className="spinner-container text-center justify-content-md-center align-items-center vh-100 mt-5">
        <Spinner animation="border" role="status" className="custom-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ) : (
      <>
        <h1 className="mb-4 text-center text-black">Update Project</h1>
        <ProjectForm onSubmit={onSubmit} defaultValues={project} isLoading={isUpdating} />
      </>
    )}
  </Col>
</Row>
    </Container>
  );
};

export default EditProject;
