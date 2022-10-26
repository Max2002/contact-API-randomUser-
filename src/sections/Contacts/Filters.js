import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Button, TextField } from '../../components';
import { ClearFilterSvg, ClearInputSvg, SearchSvg } from '../../assets/icons';
import st from './styles.module.scss';

const initialValues = {
  fullName: '',
  gender: '',
  nat: '',
};

export default function Filters(props) {
  const { filterByName, filterGender, filterNat, nationalities } = props;
  const animatedComponents = makeAnimated();
  const optionsGender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'indeterminate', label: 'Indeterminate' },
  ];
  const selectNationalities = nationalities.map((nat) => ({
    value: nat,
    label: nat,
  }));

  const selectGender = (set, value) => {
    set('gender', value);
    filterGender(value.value);
  };

  const selectNat = (set, value) => {
    set('nat', value);
    filterNat(value);
  };

  const onChangeForm = ({ value }) => filterByName(value);

  const clearFilters = (reset) => {
    reset();
    onChangeForm('');
  };

  return (
    <div className={st.wrapperFilters}>
      <div className={st.filters}>
        <Formik initialValues={initialValues} onSubmit={null}>
          {({ resetForm, setFieldValue, values }) => (
            <Form
              className={st.form}
              onChange={({ target }) => onChangeForm(target)}
            >
              <div className={st.filterByName}>
                <TextField
                  className={st.field}
                  type="text"
                  name="fullName"
                  placeholder="Search by full name"
                  suffix={false}
                />
                {values.fullName && (
                  <Button
                    type="button"
                    className={st.fieldBtn}
                    onClick={() => setFieldValue('fullName', '')}
                  >
                    <ClearInputSvg />
                  </Button>
                )}
                <div className={st.searchIcon}>
                  <SearchSvg />
                </div>
              </div>
              <Select
                className={st.gender}
                value={values.gender}
                options={optionsGender}
                onChange={(value) => selectGender(setFieldValue, value)}
                placeholder="Gender"
              />
              <Select
                className={st.selectNat}
                value={values.nat}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={selectNationalities}
                placeholder="Nationality"
                onChange={(value) => selectNat(setFieldValue, value)}
              />
              <div className={st.clear} onClick={() => clearFilters(resetForm)}>
                <ClearFilterSvg />
                <Button type="button" className={st.clearBtn}>
                  Clear
                </Button>
              </div>
            </Form>
          )}
        </Formik>
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
