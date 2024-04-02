import React from 'react'
import styled from 'styled-components'

function CreateUser() {
    return (
        <></>
    )
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
`
const SButton = styled.button`
    width: 100%;
    padding: 1rem;
    margin: 1rem;
    background-color: #e9ab17;     
    border: none;
    border-radius: 1rem;

    &:hover {
            color: white;
            transition: 0.3s;
        }
`
export default CreateUser