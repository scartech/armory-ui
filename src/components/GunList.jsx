import PropTypes from 'prop-types';
import GunCard from './GunCard';

function GunList({ guns, handleDeleteClick }) {
  return (
    <>
      {guns.map((gun) => (
        <GunCard key={gun.id} gun={gun} handleDeleteClick={handleDeleteClick} />
      ))}
    </>
  );
}

GunList.propTypes = {
  guns: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default GunList;
