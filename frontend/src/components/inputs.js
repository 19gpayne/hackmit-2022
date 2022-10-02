import React from 'react';
import styled from 'styled-components';
import {colors} from '../utils/colors';
import { Subheader20 } from './fonts';

const TextArea = styled.div`
    text-align: left;
    display: block;
    border: 1px solid ${colors.secondary};
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    input, select {
        font-family: Playfair Display; 
        font-weight: bold;
        font-size: 24px;
        border: 0;
        color: ${colors.quarternary};
        outline: none;
        &::placeholder {
            color: ${colors.quarternary};
        }
    }
    div {
        font-family: Playfair Display; 
        font-weight: bold;
        font-size: 16px;
        color: ${colors.tertiary};
    }
`;

const StyledButton = styled.div`
    background-color: ${colors.primary};
    padding: 10px 20px;
    color: white;
    border-radius: 1rem;
    font-family: Playfair Display;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

const StyledButtonSmall = styled.div`
    background-color: ${colors.primary};
    padding: 7px 20px;
    color: white;
    border-radius: 3rem;
    font-family: Playfair Display;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

const StyledButtonSmall2 = styled.div`
    background-color: white;
    padding: 7px 20px;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    border-radius: 3rem;
    font-family: Playfair Display;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

export const TextInput = ({type, id, onChange, placeholder, value, title}) => (
    <TextArea>
        <div>{title}</div>
        <input 
            id={id} 
            type={type}
            onChange={onChange} 
            placeholder={placeholder} 
            value={value} 
        />
    </TextArea>
);

export const Dropdown = ({title, options}) => (
    <TextArea>
        <div>{title}</div>
        <select>
            {options.map(o => (
                <option key={o}>{o}</option>
            ))}
        </select>
    </TextArea>
);

export const Button = ({title, onClick, style}) => (
    <StyledButton onClick={onClick} style={style}>
        {title}
    </StyledButton>
);

export const SmallButton = ({title, onClick}) => (
    <StyledButtonSmall onClick={onClick}>
        {title}
    </StyledButtonSmall>
);

export const SmallButton2 = ({title, onClick}) => (
    <StyledButtonSmall2 onClick={onClick}>
        {title}
    </StyledButtonSmall2>
);

export const Checkbox = ({title, value, checked}) => (
    <div style={{display: 'inline-flex'}}>
        <input type="checkbox"/><Subheader20>&nbsp;{title}</Subheader20>
    </div>
);