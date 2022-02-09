import React from 'react';
import styled from '@emotion/styled';

const Description = () => {
    return (
        <Container>
            <Title>illlama's Exhibition Editor</Title>
            <Descript>
                부스트캠프 6기 그룹 프로젝트{' '}
                <Link href="https://github.com/boostcampwm-2021/web14-salondesrefuses">벽전(Salon des Refusés)</Link>를
                만들면서 제작한 에디터입니다.
            </Descript>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
`;
const Title = styled.p`
    font-size: 32px;
`;
const Link = styled.a`
    text-decoration: none;
    color: #a7bbc7;
    &:hover {
        color: #e1e5ea;
    }
`;
const Descript = styled.p`
    font-size: 21px;
`;

export default Description;
