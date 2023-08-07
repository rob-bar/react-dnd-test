import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { loremIpsum } from "lorem-ipsum";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import { MyDraggableCard } from "./MyDraggableCard";

export function App() {
  return (
    <>
      <h1>Vite + React + ReactDnD</h1>
      <DndProvider backend={HTML5Backend}>
        <Container>
          {[...Array(50)].map((_, index) => (
            <MyDraggableCard index={index} key={index} title={loremIpsum()} />
          ))}
        </Container>
      </DndProvider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  gap: 1rem;
`;
