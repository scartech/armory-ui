import PropTypes from 'prop-types';
import GunList from './GunList';
import GunGrid from './GunGrid';

function GunsComponent({ useGrid, guns, handleDeleteClick }) {
  return (
    <>
      {useGrid ? (
        <GunGrid guns={guns} handleDeleteClick={handleDeleteClick} />
      ) : (
        <GunList guns={guns} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

GunsComponent.propTypes = {
  useGrid: PropTypes.bool.isRequired,
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunsComponent;
