import { useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { ClearFilterSvg, ClearInputSvg, SearchSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Filters(props) {
  const { filterByName, filterGender, filterNat, nationalities } = props;
  const animatedComponents = makeAnimated();
  const refFullName = useRef();
  const refGender = useRef();
  const refNat = useRef();
  const optionsGender = [
    { value: 'gender', label: 'Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'indeterminate', label: 'Indeterminate' },
  ];
  const selectNationalities = nationalities.map((nat) => ({
    value: nat,
    label: nat,
  }));

  const onChangeFullName = () =>
    filterByName(refFullName.current.value.toLowerCase());

  const clearFullName = () => {
    refFullName.current.value = '';
    onChangeFullName();
  };

  const selectGender = ({ value }) => filterGender(value);

  const selectNat = (value) => filterNat(value);

  const clearFilters = () => {
    refFullName.current.value = '';
    onChangeFullName();
    refGender.current.props.value.value = 'gender';
    refGender.current.props.value.label = 'Gender';
    refNat.current.props.value = null;
  };

  return (
    <div className={st.wrapperFilters}>
      <div className={st.filters}>
        <div className={st.filterByName}>
          <div className={st.fieldFilter}>
            <input
              className={st.field}
              type="text"
              name="fullName"
              placeholder="Search by full name"
              ref={refFullName}
              onKeyUp={onChangeFullName}
            />
            {refFullName.current?.value && (
              <Button
                type="button"
                className={st.fieldBtn}
                onClick={clearFullName}
              >
                <ClearInputSvg />
              </Button>
            )}
          </div>
          <div className={st.searchIcon}>
            <SearchSvg />
          </div>
        </div>
        <Select
          className={st.gender}
          ref={refGender}
          name="gender"
          options={optionsGender}
          onChange={selectGender}
          placeholder="Gender"
        />
        <Select
          className={st.selectNat}
          ref={refNat}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={selectNationalities}
          placeholder="Nationality"
          onChange={selectNat}
        />
        <div className={st.clear} onClick={clearFilters}>
          <ClearFilterSvg />
          <Button type="button" className={st.clearBtn}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  filterByName: PropTypes.func.isRequired,
  filterGender: PropTypes.func.isRequired,
  filterNat: PropTypes.func.isRequired,
  nationalities: PropTypes.arrayOf(PropTypes.string).isRequired,
};
