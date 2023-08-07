import styled, { css } from "styled-components";
import { ConnectableElement, useDrag, useDrop } from "react-dnd";
import { useEffect, useState } from "react";

type MyDraggableCardProps = {
  index: number;
  title: string;
};

enum ItemTypes {
  CARD = "card",
}

export const MyDraggableCard = ({ index, title }: MyDraggableCardProps) => {
  const [canDropDelayed, setCanDropDelayed] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.CARD],
    drop: async (_: unknown, monitor: { getItemType: () => unknown }) => {
      switch (monitor.getItemType()) {
        case ItemTypes.CARD: {
          console.log("dropped" + ItemTypes.CARD);
          break;
        }
      }
    },
    collect: (monitor: {
      isOver: (arg0: { shallow: boolean }) => boolean;
      canDrop: () => boolean;
    }) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ opacity, isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.1 : 1,
      }),
    }),
    []
  );

  const previewDropRef = (el: ConnectableElement) => preview(drop(el));

  useEffect(() => {
    setTimeout(() => setCanDropDelayed(canDrop), 0);
  }, [canDrop]);

  return (
    <Wrapper>
      <DropContainer
        ref={previewDropRef}
        $isDragging={isDragging}
        $isOver={isOver}
        $canDrop={canDropDelayed}
        key={index}
      >
        <Container style={{ opacity }}>
          <h3>
            {index + 1}: {title}
          </h3>
          <MyDragButton onClick={(e) => e.preventDefault()} ref={drag}>
            Drag here
          </MyDragButton>
        </Container>
      </DropContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  color: #111111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  user-select: none;
`;

const MyDragButton = styled.button`
  background-color: #0e7be0;
  padding: 1rem;
  line-height: 1;
`;

export const DropContainer = styled.div<GetDropBorder>`
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  ${({ $canDrop, $isOver, $isDragging }) =>
    getDropBorder({ $canDrop, $isOver, $isDragging })};
`;

export type GetDropBorder = {
  $canDrop?: boolean;
  $isOver?: boolean;
  $isDragging?: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export function getDropBorder({
  $canDrop,
  $isOver,
  $isDragging,
}: GetDropBorder) {
  if ($isDragging) {
    return css`
      pointer-events: auto;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
      border-radius: 0.3125rem;
      border: 0.0625rem solid transparent;
    `;
  }

  if ($canDrop && $isOver) {
    return css`
      pointer-events: auto;
      border-radius: 0.3125rem;
      transform: scale(1);
      border: 0.1875rem dashed #00c267;
    `;
  } else if ($canDrop) {
    return css`
      pointer-events: auto;
      border-radius: 0.3125rem;
      transform: scale(0.925);
      border: 0.1875rem dashed #0e7be0;
    `;
  }

  return css`
    border-radius: 0.3125rem;
    border: 0.0625rem solid transparent;
  `;
}
function setImmediate(arg0: () => any) {
  throw new Error("Function not implemented.");
}
