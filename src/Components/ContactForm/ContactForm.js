import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styles from './ContactForm.module.css';

function ContactForm({ getFormData }) {
  const { register, handleSubmit, errors, reset } = useForm();
  const btn = useRef();

  const onSubmit = data => {
    getFormData(data.name.trim(), data.number.trim());
    btn.current.blur();
    reset({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        <input
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 18,
            pattern: /^[A-Za-z]+([ A-Za-z]+)*$/,
          })}
          className={styles.addField}
          type="text"
          name="name"
          placeholder="name"
        />
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>Name is required</p>
        )}
        {errors.name && errors.name.type === 'minLength' && (
          <p className={styles.error}>
            Name is too short. Minimum 3 characters required.
          </p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p className={styles.error}>
            Name is too long. Maximum 18 characters allowed.
          </p>
        )}
        {errors.name && errors.name.type === 'pattern' && (
          <p className={styles.error}>Name can contain only english letters.</p>
        )}
      </label>
      <label className={styles.label}>
        <input
          ref={register({ required: true, pattern: /^\d+$/ })}
          className={styles.addField}
          type="text"
          name="number"
          placeholder="xxxx-xx-xx"
        />
        {errors.number && errors.number.type === 'required' && (
          <p className={styles.error}>Number is required</p>
        )}
        {errors.number && errors.number.type === 'pattern' && (
          <p className={styles.error}>
            Phone number should consist only from numbers.
          </p>
        )}
      </label>
      <button ref={btn} className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  getFormData: PropTypes.func.isRequired,
};

export default ContactForm;