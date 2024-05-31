import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const ProjectSearch = ({ searchTerm, setSearchTerm }) => {
    return (
      <Form className="d-flex justify-content-end my-3">
        <InputGroup className="w-100 w-md-50">
          <InputGroup.Text id="search-icon">
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            type="search"
            placeholder="Search projects..."
            aria-label="Search"
            aria-describedby="search-icon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow: "none",
              border: "1px solid #ced4da",
            }}
          />
        </InputGroup>
      </Form>
    );
  };

  export default ProjectSearch