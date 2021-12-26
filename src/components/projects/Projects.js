import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { projectData } from '../../constants/index';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const ProjectsWrapper = styled.div`
    width: 100%;
    height: ${props => props.totalHeight}px;
    display: flex;
    flex-flow: row nowrap;
`;

function Projects() {
    const startTop = 1400;
    const windowHeight = window.innerHeight;
    const totalHeight = windowHeight * (projectData.length - 1);

    const [slideNumber, setSlideNumber] = useState(0);

    const handleScroll = (event) => {
        const { scrollTop } = event.srcElement.documentElement;
        if (scrollTop > startTop) {
            const currentNumber = Math.floor((scrollTop - startTop) / windowHeight) + 1;
            if (scrollTop > (startTop + totalHeight) - (windowHeight * 0.5)) {
                setSlideNumber(0);
            } else if (currentNumber < projectData.length - 1) {
                setSlideNumber(currentNumber);
            }
        } else {
            setSlideNumber(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <ProjectsWrapper id="projects" totalHeight={totalHeight}>
            <TextContent
                id={projectData[slideNumber].id}
                name={projectData[slideNumber].name} 
                desc={projectData[slideNumber].desc}
                type={projectData[slideNumber].type}
                role={projectData[slideNumber].role}
                tech={projectData[slideNumber].tech}
                link={projectData[slideNumber].link}
            />
            <ImageContent />
        </ProjectsWrapper>
    );
}

export default Projects;
