import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormInput = styled(Input)`
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
`

const Input = (props) => {
    const { type, name, value, placeholder, onChange, onBlur, label } = props;
    return (
        <>
            <label>{label}</label>
            <FormInput
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            />
        </>
    );
}

Input.defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    onChange: () => {},
    onBlur: () => {},
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default Input