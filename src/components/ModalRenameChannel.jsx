import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

  @connect(mapStateToProps)

@reduxForm({
  form: 'RenameChannel',
})
class ModalRenameChannel extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
      };
    }

    handleSubmit = async (value) => {
      const { renameChannel, reset, currentChannelId } = this.props;
      await renameChannel({ name: value.name }, currentChannelId);
      reset();
      this.handleClose();
    };


    handleClose = () => {
      this.setState({ show: false });
    }

    handleShow = () => {
      this.setState({ show: true });
    }

    render() {
      const {
        handleSubmit, submitting, pristine,
      } = this.props;
      const { show } = this.state;
      return (
        <>
          <Button variant="inherit" onClick={this.handleShow}>
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="text-info"
            />
          </Button>
          <Modal show={show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>New channel name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                action=""
                className="d-flex"
                onSubmit={handleSubmit(this.handleSubmit)}
              >
                <div className="input-group">
                  <Field
                    name="name"
                    disabled={submitting}
                    type="text"
                    className="form-control"
                    component="input"
                    required
                  />
                  <div className="input-group-append">
                    <Button
                      className="btn btn-info"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Rename channel'}
                    </Button>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default ModalRenameChannel;
