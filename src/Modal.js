import React, { Component } from 'react';
import FormInputs from './FormInputs';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.modal = React.createRef();
    this.closeButton = React.createRef();
    this.cancelButton = React.createRef();
    this.modalOverlay = React.createRef();
    this.message = React.createRef();

    this.focusCloseButton = this.focusCloseButton.bind(this);
    this.focusCancelButton = this.focusCancelButton.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);

    document.onkeyup = this.closeOnEscape;
  }

  componentDidMount() {
    this.modal.current.focus();
  }

  closeOnEscape(evt) {
    if (evt.keyCode === 27 && this.props.isVisible) {
      evt.preventDefault();
      this.props.closeModal();
    }
  }

  focusCloseButton(evt) {
    if (evt.keyCode === 9 && !evt.nativeEvent.shiftKey) {
      evt.preventDefault();
      this.closeButton.current.focus();
    }
  }

  focusCancelButton(evt) {
    if (evt.keyCode === 9 && evt.nativeEvent.shiftKey) {
      evt.preventDefault();
      this.cancelButton.current.focus();
    }
  }

  render() {
    return (
      <div className={`modal-container ${this.props.isVisible ? 'modal-container--visible' : '' }`}>
        <div className="modal-overlay" ref={this.modalOverlay} onClick={this.props.closeModal}></div>
        <div
          className="modal"
          ref={this.modal}
          tabIndex="0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ModalHeader"
        >
          <div className="modal__header">
            <h2 id="ModalHeader">Register for a class</h2>
            <button
              className="button button--icon"
              onClick={this.props.closeModal}
              ref={this.closeButton}
              onKeyDown={this.focusCancelButton}
              tabIndex="0"
            >
              <i className="fas fa-times"
                aria-hidden="true"
              />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <p>You are registering for <strong>Stateful yoga (Thursday at 6:30pm)</strong>.</p>
          <form onSubmit={this.onFormSubmit}>
            <FormInputs />
            <div className="modal__form-actions">
              <input
                type="submit"
                value="Sign up"
                className="button button--primary"
              />
              <button
                className="button"
                ref={this.cancelButton}
                onKeyDown={this.focusCloseButton}
                onClick={this.props.closeModal}
                tabIndex="0"
              >Close</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
