import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, onLoadClick }) => {
    return (
        <button className="btnLoadMore" type="button" onClick={onLoadClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onLoadClick: PropTypes.func,
};

export default Button;
