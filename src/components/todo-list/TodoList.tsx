import styled from 'styled-components';
import CommmonButton from '../../styles/CommonButton';

const TodoList = () => {
  return (
    <TodoListWrapper>
      <TodoListHeader>
        <Addbutton>todo 추가</Addbutton>
        <Filter>
          <FilterButton>전체</FilterButton>
          <FilterButton>완료</FilterButton>
          <FilterButton>미완료</FilterButton>
        </Filter>
      </TodoListHeader>

      <List>
        <TodoItem>
          <input type="checkbox" />
          <div className="title">제목</div>
          <div className="button-container">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </TodoItem>
        <TodoItem>
          <input type="checkbox" />
          <div className="title">제목</div>
          <div className="button-container">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </TodoItem>
        <TodoItem>
          <input type="checkbox" />
          <div className="title">제목</div>
          <div className="button-container">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </TodoItem>
      </List>
    </TodoListWrapper>
  );
};

export default TodoList;

const TodoListWrapper = styled.div`
  width: 800px;
  padding: 80px 100px 40px 100px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TodoListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Addbutton = styled(CommmonButton)`
  align-self: flex-end;
`;

const Filter = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  background-color: transparent;
  border: none;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoItem = styled.li`
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  border: solid 1px #000;

  > .title {
    flex-grow: 1;
  }

  .button-container {
    visibility: hidden;
  }

  &:hover > .button-container {
    visibility: visible;
    display: flex;
    gap: 10px;
  }
`;
