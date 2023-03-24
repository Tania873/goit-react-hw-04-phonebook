import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={css.filterForm}>
      <label className={css.label}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={e => onChangeFilter(e.target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
