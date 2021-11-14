import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleModalEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleModalEscape);
    }

    handleModalEscape = e => {
        if (e.keyCode === 27) this.resetModal();
    };

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) this.resetModal();
    };

    resetModal = e => {
        this.props.modalClose(e);
    };

    render() {
        return createPortal(
            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal">{this.props.children}</div>
            </div>,
            modalRoot,
        );
    }

    static propTypes = {
        modalClose: PropTypes.func.isRequired,
        children: PropTypes.node,
    };
}
