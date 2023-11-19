import PropTypes from "prop-types";

const Form = ({ onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form className={"mx-5 md:mx-20"} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
