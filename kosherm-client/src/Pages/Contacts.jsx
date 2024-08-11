import React from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';

const ContactContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContactCard = styled.div`
    border: 1px solid #ccc;
    border-radius: 2rem;
    padding: 2rem;
    width: 400px;
    margin-right: 2rem;
    background-color: #f0f0f0;

    h2 {
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        width: 300px;
        margin-bottom: 2rem;
        margin-right: 0;
    }
`;

function Contacts() {
    return (
        <>
            <Header />
            <h1 style={{ textAlign: 'center', margin: '2rem' }}>Contact Us</h1>
            <ContactContainer>
                <ContactCard>
                    <h2>Technical Support</h2>
                    <p>Email: kristiyanalexiev@photonics.bg</p>
                    <p>Telephone: 1234567890</p>
                    <p>Address: Sofia, Bulgaria</p>
                </ContactCard>

                <ContactCard>
                    <h2>Operator</h2>
                    <p>Email: operator@email.com</p>
                    <p>Telephone: 1234567890</p>
                    <p>Address: Sofia, Bulgaria</p>
                </ContactCard>
            </ContactContainer>
        </>
    );
}

export default Contacts;