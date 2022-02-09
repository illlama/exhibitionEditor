import React from 'react';
import styled from '@emotion/styled';

const Footer = () => {
    return (
        <Container>
            <Text>김일혁</Text>
            <Text>beatlemaniakih@gmail.com</Text>
            <Text>010-8545-4795</Text>
            <Link href="https://github.com/illlama">Github</Link>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    background-color: #e1e5ea;
    margin-top: 30px;
    padding: 20px 10%;
`;
const Text = styled.p`
    margin: 5px 0;
    font-size: 14px;
`;
const Link = styled.a`
    text-decoration: none;
    color: #da7f8f;
    &:hover {
        color: #a7bbc7;
    }
`;
export default Footer;
