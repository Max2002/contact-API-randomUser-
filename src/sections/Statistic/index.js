import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function Statistic({ contacts }) {
  const amountGender = { male: 0, female: 0, indeterminate: 0 };
  const amountNat = {};

  contacts.reduce((preventValue, { gender, nat }) => {
    amountGender[gender] += 1;
    amountNat[nat] = amountNat[nat] ? (amountNat[nat] += 1) : 1;
  }, {});
  const maxGender = Math.max(...Object.values(amountGender));
  const [dominateGender] = Object.keys(amountGender).filter(
    (key) => amountGender[key] === maxGender,
  );

  return (
    <div className={st.wrapper}>
      <div className={st.statistic}>
        <h2 className={st.statisticTitle}>Statistic</h2>
        <div className={st.amount}>
          <div>
            <p className={st.collectionTitle}>Collection size</p>
            <p className={st.value}>{contacts.length}</p>
          </div>
          <div className={st.genders}>
            <div className={st.wrapperGender}>
              <div className={st.collection}>
                <p className={st.collectionTitle}>Males</p>
                <p className={st.value}>{amountGender.male}</p>
              </div>
              <div className={st.collection}>
                <p className={st.collectionTitle}>Females</p>
                <p className={st.value}>{amountGender.female}</p>
              </div>
              <div className={st.collection}>
                <p className={st.collectionTitle}>Indeterminate</p>
                <p className={st.value}>{amountGender.indeterminate}</p>
              </div>
            </div>
            <div className={st.predominate}>{dominateGender} predominate</div>
          </div>
        </div>
        <div>
          <p className={st.titleNats}>Nationalities</p>
          <div className={st.nationalities}>
            {Object.keys(amountNat).map((key) => (
              <div key={key} className={st.nat}>
                <span>{key}:</span> {amountNat[key]} contacts
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Statistic.propTypes = {
  contacts: PropTypes.array.isRequired,
};
